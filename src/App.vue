<script setup lang="ts">
import { ref,reactive } from 'vue';
import { ElTable,
  ElTableColumn,
  ElDialog,
  ElForm,
  ElFormItem,
  ElTimePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElCol,
  ElRow,
  ElInput } from 'element-plus';


const formModel = reactive({
    name:'',
    startStation:'',
    endStation:'',
    stationList:[]
})


const keyName = ref()


const dialogVisible = ref(false)
const dialogDetailVisible = ref(false)
const nowDialogVisible = ref(false)

const dataSource = ref([
  {
    name:'K144',
    startStation:'西安',
    endStation:'重庆'
  }
])

const addNewLine = () =>{
  dialogVisible.value = true
}

const submitForm = () =>{
  dialogVisible.value = false
  console.log(formModel)
}

const handleDetail = () =>{
  dialogDetailVisible.value = true
}

const seeNowLoaction = () =>{
  nowDialogVisible.value = true
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

const queryList = () =>{

}

</script>

<template>
  <div>
    <el-button type="primary" @click="addNewLine">新增班次</el-button>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-input v-model="keyName" placeholder="请输入站点名"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="queryList">查询</el-button>
      </el-col>
    </el-row>
   
    <el-table :data="dataSource" class="table">
      <el-table-column label="列车班次" prop="name"></el-table-column>
      <el-table-column label="起始站" prop="startStation"></el-table-column>
      <el-table-column label="终点站" prop="endStation"></el-table-column>
      <el-table-column label="操作">
        <template #default>
        <el-button link type="primary" size="small" @click="handleDetail"
          >详情</el-button
        >
        <el-button link type="primary" size="small" @click="seeNowLoaction">查看目前所在位置</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" v-model="dialogVisible">
      <el-form :model="formModel">
        <el-form-item label="线路名字" label-width="100px">
          <el-input v-model="formModel.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="线路起始站">
          <el-input v-model="formModel.startStation" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="线路终点站">
          <el-input v-model="formModel.endStation" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="线路站点">
          <el-button type="primary" @click="addNewStation">添加</el-button>
          <el-table :data="formModel.stationList">
            <el-table-column label="站点名" prop="name">
              <template #default="scope">
                <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="到站时间" prop="arrival">
              <template #default="scope">
                <el-time-picker v-model="scope.row.arrival" format="HH:mm:ss" placeholder="请选择" />
              </template>
            </el-table-column>
            <el-table-column label="离站时间" prop="leave">
              <template #default="scope">
                <el-time-picker v-model="scope.row.leave" format="HH:mm:ss" placeholder="请选择" />
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
          <el-button type="primary" @click="submitForm">
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
        
       </el-descriptions-item>
       <el-descriptions-item label="起始站">
        
       </el-descriptions-item>
       <el-descriptions-item label="终点站">
        
       </el-descriptions-item>
       <el-descriptions-item label="站点">
          
       </el-descriptions-item>
       
       </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDetailVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="目前所在位置" v-model="nowDialogVisible">
      <div>重庆至成都</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="nowDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<style lang="less" scoped>

.size {
  width: 100%;
  height: 100%;
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
