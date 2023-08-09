<template>
     <div class="title">智慧信息指挥室</div>
     <img v-if="detailId==1" style="width: 100%;height: 100%;" src="@/assets/line.jpg"/>
     <img v-if="detailId==2" style="width: 100%;height: 100%;" src="@/assets/ren.png"/>
     <img v-if="detailId==4" style="width: 100%;height: 100%;" src="@/assets/pai.png"/>
     <img v-if="detailId==5" style="width: 100%;height: 100%;" src="@/assets/rili.png"/>
     <div v-if="detailId==1" class="zhangjiakou" @click="zhangClick">点击张家口</div>
     <div v-if="detailId==1" class="xianzhan" @click="xianClick">点击西安</div>
     <div v-if="detailId==2" class="renyuchi" @click="zhangClick">点击人</div>

    <div v-if="detailId==6">
      <div style="margin-bottom: 20px;color: #409dfd; font-size: 20px;">安全检查记录</div>
      <el-table :data="saleList">
        <el-table-column label="检查时间" prop="time"></el-table-column>
        <el-table-column label="检查地点" prop="address"></el-table-column>
        <el-table-column label="检查备注" prop="remark"></el-table-column>
      </el-table>
    </div>

    
    <div v-if="detailId==7">
      <div style="margin-bottom: 20px;color: #409dfd; font-size: 20px;">模板学习</div>
      <el-table :data="saleList">
        <el-table-column label="名称" prop="time"></el-table-column>
        <el-table-column label="类型" prop="address"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" prop="remark">
          <template #default>
          <el-button link type="primary" size="small" @click="handleMoban()">详情</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>



    <div v-if="detailId==10">
      <img src="@/assets/oq.png">
    </div>
    
    <div v-if="detailId==11">
      <img src="@/assets/ding.png">
    </div>

    <div class="tese" v-if="detailId==12">“情指勤舆”一体指挥</div>

     <el-dialog title="" v-model="nowDialogVisible">
        <div style="display: flex;" v-if="showType=='ren'">
          <img style="margin-right: 20px;" src="@/assets/head.png"/>
          <el-descriptions
            class="margin-top"
            title="民警信息"
            :column="3"
            border
          >
          <el-descriptions-item label="姓名">任宇驰</el-descriptions-item>
          <el-descriptions-item label="年龄">28</el-descriptions-item>
          <el-descriptions-item label="警号">041285</el-descriptions-item>
          <el-descriptions-item label="职务">xxxx</el-descriptions-item>
          <el-descriptions-item label="工作年限">xxxx</el-descriptions-item>
          <el-descriptions-item label="学历">xxxx</el-descriptions-item>
         </el-descriptions>
        </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="nowDialogVisible = false">关闭</el-button>
        </span>
      </template>
     </el-dialog>
</template>


<script setup lang="ts">
import { ref,reactive, onMounted,computed } from 'vue';
import { useRoute } from 'vue-router'

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
  ElImage,
  ElMessageBox,
  ElMessage,
  ElInput } from 'element-plus';

const nowDialogVisible = ref()

const currentUrl = ref()
const { query } = useRoute()

const showType = ref('ren')

const saleList = ref([
  {
    time:'xxxxx',address:'xxxxx',remark:'xxxxxxxxxxxxxxx'
  },
  {
    time:'xxxxx',address:'xxxxx',remark:'xxxxxxxxxxxxxxx'
  },
  {
    time:'xxxxx',address:'xxxxx',remark:'xxxxxxxxxxxxxxx'
  },
  {
    time:'xxxxx',address:'xxxxx',remark:'xxxxxxxxxxxxxxx'
  },
  {
    time:'xxxxx',address:'xxxxx',remark:'xxxxxxxxxxxxxxx'
  }
])

const detailId  = ref((query.id as unknown as number) && (query.id as unknown as number))

const zhangClick = () =>{
  showType.value = 'ren'
  nowDialogVisible.value = true
}

const xianClick = () =>{
  ElMessageBox.confirm('是否拨打值班电话：xxxxx', '西安站', {
      confirmButtonText: '拨打',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '拨打成功',
      })
    })
    .catch(() => {
     
    })
}

const handleMoban = () =>{
  window.open("https://file1.renrendoc.com/fileroot_temp2/2020-12/19/adfd1a55-302d-4f7a-bf42-a7c692cfecab/adfd1a55-302d-4f7a-bf42-a7c692cfecab1.gif")
}

onMounted(() =>{
    // console.log(detailId)
})


</script>

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

.zhangjiakou{
  position: absolute;
  top: 32%;
  left: 58%;
  width: 100px;
  height: 100px;
  opacity:0
}

.xianzhan{
  position: absolute;
  top: 68%;
  left: 35%;
  width: 100px;
  height: 100px;
  opacity:0
}

.renyuchi{
  position: absolute;
  top: 17%;
  left: 8%;
  width: 200px;
  height: 250px;
  opacity:0
}


.tese{
  text-align: center;
  margin-top: 30%;
  font-size: 30px;
  font-weight: bold;
  color: #409dfd;
}


</style>