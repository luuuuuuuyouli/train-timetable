<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue';
import { ElTable,
  ElTableColumn,
  ElDialog,
  ElForm,
  ElFormItem,
  FormInstance,
  FormRules,
  ElDescriptions,
  ElDescriptionsItem,
  ElCol,
  ElRow,
  ElMessage,
  ElInput } from 'element-plus';
import AV from 'leancloud-storage'
import { formatDate } from './formatTime'
 
const { Query, User } = AV
const ruleFormRef = ref<FormInstance>()
const formRules =reactive<FormRules>({
    name: [{ required: true, message: "不能为空", trigger: "change" }],
    startStation: [{ required: true, message: "不能为空", trigger: "change" }],
    endStation: [{ required: true, message: "不能为空", trigger: "change" }],
    stationList: [{ required: true, message: "不能为空", trigger: "change" }],
})


const formModel = reactive({
    name:'',
    startStation:'',
    endStation:'',
    stationList:[]
})

const className = 'trainList'
const keyName = ref()


const dialogVisible = ref(false)
const dialogDetailVisible = ref(false)
const nowDialogVisible = ref(false)
const loading = ref(false)
const actionLoading = ref(false)
const detailInfo = reactive({
    name:'',
    startStation:'',
    endStation:'',
    stationList:[]
})
const dataSource = ref([])

const addNewLine = () =>{
  dialogVisible.value = true
  formModel.name = ''
  formModel.startStation = ''
  formModel.endStation = ''
  formModel.stationList = []
}

const submitForm = () =>{
  ruleFormRef.value.validate((val) =>{
      if(val){
        console.log(formModel)
        // 声明 class
        const Todo = AV.Object.extend(className);
        // 构建对象
        const todo = new Todo();
        // 为属性赋值
        todo.set('name', formModel.name);
        todo.set('startStation', formModel.startStation);
        todo.set('endStation', formModel.endStation);
        todo.set('stationList', JSON.stringify(formModel.stationList));

        // 将对象保存到云端
        actionLoading.value = true
        todo.save().then((todo) => {
          // 成功保存之后，执行其他逻辑
          dialogVisible.value = false
          actionLoading.value = false
          console.log(`保存成功。objectId：${todo.id}`);
          ElMessage({
            message: '保存成功',
            type: 'success',
          })
          queryList('')
        }, (error) => {
          // 异常处理
          actionLoading.value = false
          ElMessage.error(error)
        });         
        }
  })
  
  
}

const handleDetail = (row) =>{
  console.log('详情',row)
  detailInfo.name = row.name
  detailInfo.startStation = row.startStation
  detailInfo.endStation = row.endStation
  detailInfo.stationList = row.stationList
  dialogDetailVisible.value = true
}

const seeNowLoaction = (row) =>{
  console.log('详情',row)
  nowDialogVisible.value = true
  const date = formatDate(new Date(),'HH:mm')
  console.log(date)
}

const deleteStation = (index,row) =>{
  console.log(index,row)
  formModel.stationList.splice(index,1)
}

const addNewStation = () =>{
  const data = {
    name:'',
    arrival:'',
    leave:''
  }
  formModel.stationList.push(data)
}

const queryList = (name) =>{
  const query = new AV.Query(className);
  if(name != ''){
    query.contains('name', name);
  }
  loading.value = true
  query.find().then((res) => {
    console.log('列表数据',res)
    loading.value = false
    const list = res.map((val) =>{
        const item = val as any
        return {
          name:item.attributes.name,
          startStation:item.attributes.startStation,
          endStation:item.attributes.endStation,
          stationList:JSON.parse(item.attributes.stationList)
        }
    })
    console.log(list)
    dataSource.value = list
  });
}

const reset = () =>{
  keyName.value = ''
  queryList('')
}



onMounted(() =>{
  AV.init({
    appId: "E8uv2kYTuvmEse11ikCAIPV9-gzGzoHsz",
    appKey: "M5Dpavo8184mygTDQTocdU7L",
    serverURL: "https://e8uv2kyt.lc-cn-n1-shared.com"
  });
  queryList('')
})

</script>

<template>
  <div class="content">
    <div class="title">铁路站点系统</div>
    <el-button type="primary" @click="addNewLine">新增班次</el-button>
    <div style="width:500px;margin-bottom: 20px;">
      <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-input v-model="keyName" placeholder="请输入站点名"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="queryList(keyName)">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    </div>
   
    <el-table :data="dataSource" class="table" v-loading="loading">
      <el-table-column label="列车班次" prop="name"></el-table-column>
      <el-table-column label="起始站" prop="startStation"></el-table-column>
      <el-table-column label="终点站" prop="endStation"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
        <el-button link type="primary" size="small" @click="handleDetail(scope.row)"
          >详情</el-button
        >
        <el-button link type="primary" size="small" @click="seeNowLoaction(scope.row)" >查看目前所在位置</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" v-model="dialogVisible">
      <el-form 
      :model="formModel"
      ref="ruleFormRef"
      :rules="formRules"
      >
        <el-form-item label="线路名字" label-width="100px" prop="name">
          <el-input v-model="formModel.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="线路起始站" prop="startStation">
          <el-input v-model="formModel.startStation" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="线路终点站" prop="endStation">
          <el-input v-model="formModel.endStation" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="线路站点" prop="stationList">
          <el-button type="primary" @click="addNewStation">添加</el-button>
          <el-table :data="formModel.stationList">
            <el-table-column label="站点名" prop="name">
              <template #default="scope">
                <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="到站时间" prop="arrival">
              <template #default="scope">
                <el-input v-model="scope.row.arrival" placeholder="请输入HH:mm格式时间"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="离站时间" prop="leave">
              <template #default="scope">
                <el-input v-model="scope.row.leave" placeholder="请输入HH:mm格式时间"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
              <el-button type="danger" size="small" @click="deleteStation(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="actionLoading">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="详情" v-model="dialogDetailVisible">
       <el-descriptions
       :column="3"
       border
       >
       <el-descriptions-item label="线路名">
        {{ detailInfo.name  }}
       </el-descriptions-item>
       <el-descriptions-item label="起始站">
        {{ detailInfo.startStation  }}
       </el-descriptions-item>
       <el-descriptions-item label="终点站">
        {{ detailInfo.endStation  }}
       </el-descriptions-item>
       <el-descriptions-item label="站点">
        <el-table :data="detailInfo.stationList">
            <el-table-column label="站点名" prop="name">
            </el-table-column>
            <el-table-column label="到站时间" prop="arrival"> 
            </el-table-column>
            <el-table-column label="离站时间" prop="leave">
            </el-table-column>
          </el-table>
       </el-descriptions-item>
       </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDetailVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="目前所在位置" v-model="nowDialogVisible">
      <div>当前时间:{{  formatDate((new Date()),'YYYY-mm-dd HH:MM:SS') }}</div>
      <div class="nowLoaction">当前位置:重庆-----成都</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="nowDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<style lang="less" scoped>
.title{
  font-weight: bold;
  padding: 10px;
  margin-bottom: 10px;
  background: #409dfd;
  color: white;
  font-size: larger;
  text-align: center;
}
.size{
  width:100%;
  height:100%
}
.content{
  margin: 10px;
}

.nowLoaction{
  margin-top:10px

}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}
</style>
