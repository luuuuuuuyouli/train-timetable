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
  ElMessageBox,
  ElMessage,
  ElInput } from 'element-plus';
import AV from 'leancloud-storage'
import { formatDate } from './formatTime'
import { time } from 'console';
 
const { Query, User } = AV
const ruleFormRef = ref<FormInstance>()
const formRules =reactive<FormRules>({
    name: [{ required: true, message: "不能为空", trigger: "change" }],
    startStation: [{ required: true, message: "不能为空", trigger: "change" }],
    endStation: [{ required: true, message: "不能为空", trigger: "change" }],
    stationList: [{ required: true, message: "不能为空", trigger: "change" }],
})

const showContent = ref(false)
const formModel = reactive({
    name:'',
    startStation:'',
    endStation:'',
    stationList:[],
    id:'',
    remark:''
})
const reslutStr = ref()
const className = 'trainList'
const keyName = ref()
const isEdit = ref(false)
const customTime = ref('')

const dialogVisible = ref(false)
const dialogDetailVisible = ref(false)
const nowDialogVisible = ref(false)
const loading = ref(false)
const actionLoading = ref(false)
const detailInfo = reactive({
    name:'',
    startStation:'',
    endStation:'',
    stationList:[],
    remark:''
})
const dataSource = ref([])
const selectRow = ref()
const addNewLine = () =>{
  dialogVisible.value = true
  isEdit.value = false
  formModel.name = ''
  formModel.startStation = ''
  formModel.endStation = ''
  formModel.remark = ''
  formModel.stationList = []
}

const submitForm = () =>{


  ruleFormRef.value.validate((val) =>{
      if(val){
        console.log(formModel)
        if(isEdit.value){
          updateData()
        }else{
          crateData()
        }     
      }
  })
  
  
}

const updateData = () =>{
  const todo = AV.Object.createWithoutData(className,formModel.id);
  todo.set('name', formModel.name);
  todo.set('startStation', formModel.startStation);
  todo.set('endStation', formModel.endStation);
  todo.set('stationList', JSON.stringify(formModel.stationList));
  todo.set('remark', formModel.remark);
  actionLoading.value = true
  todo.save().then(() =>{
    dialogVisible.value = false
    actionLoading.value = false
      console.log(`修改成功。objectId：${todo.id}`);
      ElMessage({
          message: '修改成功',
          type: 'success',
      })
      queryList('')
    }, (error) => {
        actionLoading.value = false
        ElMessage.error(error)
    })
}

const crateData = () =>{
   // 声明 class
   const Todo = AV.Object.extend(className);
        // 构建对象
        const todo = new Todo();
        // 为属性赋值
        todo.set('name', formModel.name);
        todo.set('startStation', formModel.startStation);
        todo.set('endStation', formModel.endStation);
        todo.set('stationList', JSON.stringify(formModel.stationList));
        todo.set('remark', formModel.remark);
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

const handleDetail = (row) =>{
  console.log('详情',row)
  detailInfo.name = row.name
  detailInfo.startStation = row.startStation
  detailInfo.endStation = row.endStation
  detailInfo.stationList = row.stationList
  detailInfo.remark = row.remark
  dialogDetailVisible.value = true
}

const seeNowLoaction = (row) =>{
  console.log('详情',row)
  selectRow.value = row
  nowDialogVisible.value = true
  formModel.remark = row.remark
  formModel.id = row.id 
  reslutStr.value = ''
  var now = new Date()
  var nowMinutes = now.getHours() * 60 + now.getMinutes();
  getLoactionInfo(row,nowMinutes)
}

const getLoactionInfo = (row,nowMinutes) =>{
  const timeList = row.stationList.map((val) =>{
      return [val.arrival,val.leave]
  })
  console.log('时间数组',timeList)
  const timeRange = getTimeRange(timeList,nowMinutes)
  if(timeRange === null){
      console.log("当前时间不在给定的时间范围内")
      reslutStr.value = '当前列车未在行驶中'
  }else{
    if(timeRange[0] != timeRange[1]){
      reslutStr.value = "当前列车行驶在 "+row.stationList[timeRange[0]].name + ' 至 ' + row.stationList[timeRange[1]].name
    }else{
      reslutStr.value = '当前列车停靠于 ' + row.stationList[timeRange[0]].name
    }
  }
}

const getMinutes = (time) =>{
   // 将时分字符串转换为分钟数整数
  var hours = parseInt(time.slice(0, 2), 10);
  var minutes = parseInt(time.slice(3), 10);
  return hours * 60 + minutes;
}

function getTimeRange(timeList,nowMinutes) {
 
  // 将时分字符串数组扩展一倍，使其成为一个首尾相接的时间轴
  var doubledTimeList = timeList.concat(timeList);

  // 遍历扩展后的时分字符串数组，找到当前时间在哪两个时间之间
  for (var i = 0; i < timeList.length; i++) {
    var arrivalMinutes =  getMinutes(doubledTimeList[i][0])
    var leaveMinutes = getMinutes(doubledTimeList[i][1])
    // if(leaveMinutes <= arrivalMinutes){
    //   leaveMinutes += 24 * 60
    // }
    if (arrivalMinutes <= nowMinutes && nowMinutes < leaveMinutes) {
      return [i,i];
    }
    var startMinutes = getMinutes(doubledTimeList[i][0]);
    var endMinutes = getMinutes(doubledTimeList[i+1][0]);
    console.log("遍历",startMinutes,endMinutes,nowMinutes)
    if(endMinutes <= startMinutes){
      endMinutes += 24 * 60
    }
    if (startMinutes <= nowMinutes && nowMinutes < endMinutes) {
      return [i, i+1];
    }
  }
  // 如果当前时间不在数组中任何两个时间之间，则返回null
  return null;
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
          id:item.id,
          remark:item.attributes.remark,
          stationList:JSON.parse(item.attributes.stationList)
        }
    })
    console.log(list)
    dataSource.value = list
  });
}

const editRow = (row) =>{
  dialogVisible.value = true
  isEdit.value = true
  formModel.name = row.name
  formModel.startStation = row.startStation
  formModel.endStation =  row.endStation
  formModel.stationList = row.stationList
  formModel.remark = row.remark
  formModel.id = row.id
  console.log(formModel)
}

const deleteRow = (row) =>{
  console.log(row)
  ElMessageBox.confirm(
    '确认删除该数据?',
    '提示',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      const todo = AV.Object.createWithoutData(className, row.id);
      console.log(todo)
      todo.destroy().then(()=>{
          ElMessage.success('删除成功')
          queryList('')
        }, (error) => {
            ElMessage.error(error)
        });
      })
    .catch(() => {
 
    })  
}

const reset = () =>{
  keyName.value = ''
  queryList('')
}

const saveRemark = () =>{

  const todo = AV.Object.createWithoutData(className,formModel.id);
  todo.set('remark', formModel.remark);
  actionLoading.value = true
  todo.save().then(() =>{
    dialogVisible.value = false
    actionLoading.value = false
      console.log(`修改成功。objectId：${todo.id}`);
      ElMessage({
          message: '修改成功',
          type: 'success',
      })
      queryList('')
      nowDialogVisible.value = false
    }, (error) => {
        actionLoading.value = false
        ElMessage.error(error)
    })
}

const getLoactionByTime = (type) =>{
  if(type === 1){
    customTime.value = ''
    var now = new Date()
    var nowMinutes = now.getHours() * 60 + now.getMinutes();
    getLoactionInfo(selectRow.value,nowMinutes)
  }else{
    if(customTime.value != ''){
      const nowMinutes = getMinutes(customTime.value)
      getLoactionInfo(selectRow.value,nowMinutes)
    }
  }


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
  <div v-if="!showContent">
    <img src="./assets/bg.jpg" @click="showContent=true"/>
  </div>
  <div class="content" v-if="showContent">
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
      <el-table-column label="操作" width="300px">
        <template #default="scope">
        <el-button link type="primary" size="small" @click="handleDetail(scope.row)"
          >详情</el-button>
        <el-button link type="primary" size="small" @click="seeNowLoaction(scope.row)" >查看目前所在位置</el-button>
        <el-button link type="primary" size="small" @click="editRow(scope.row)" >编辑</el-button>
        <el-button link type="danger" size="small" @click="deleteRow(scope.row)" >删除</el-button>
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
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formModel.remark" placeholder="请输入" type="textarea"></el-input>
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

    <el-dialog title="所在位置查询" v-model="nowDialogVisible">
      <div>当前时间:{{  formatDate((new Date()),'YYYY-mm-dd HH:MM:SS') }}</div>
      <div style="margin-top: 10px;margin-bottom: 10px;width: 200px;">
        <el-input  v-model="customTime" placeholder="输入时分查询所在位置" style="margin-bottom: 10px;"></el-input>
        <span >
          <el-button  @click="getLoactionByTime(0)" type="primary">查询</el-button>
          <el-button style="margin-left: 10px;" @click="getLoactionByTime(1)" type="primary">重置</el-button>
        </span>
       
      </div>
      <div class="nowLoaction">{{ reslutStr }}</div>
      <div style="margin-top: 15px;margin-bottom: 10px;">备注:</div>
      <el-input v-model="formModel.remark" placeholder="请输入" type="textarea"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="nowDialogVisible = false">关闭</el-button>
          <el-button @click="saveRemark" :loading="actionLoading" type="primary">保存备注</el-button>
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
  font-size: 20px;
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
  margin-top:10px;
  color:red;
  font-size: 20px;

}
:deep(.el-textarea__inner){
    height: 100px;
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
