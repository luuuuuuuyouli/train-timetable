<template>
     <div class="title">智慧信息指挥室</div>
     <img v-if="detailId==1" style="width: 100%;height: 100%;" src="@/assets/xianlu.jpg"/>
     <img v-if="detailId==2" style="width: 100%;height: 100%;" src="@/assets/jingyuan.jpg"/>
     <img v-if="detailId==4" style="width: 100%;height: 100%;" src="@/assets/rili.jpg"/>
     <div v-if="detailId==1" class="zhangjiakou" @click="zhangClick">点击张家口</div>
     <div v-if="detailId==1" class="xianzhan" @click="xianClick">点击西安</div>
     <div v-if="detailId==2" class="renyuchi" @click="zhangClick">点击人</div>

     <div v-if="detailId==4" class="bayue" @click="bayueClick">点击八月</div>

     <el-dialog title="" v-model="nowDialogVisible" :width="showType=='bayue'?900:500">
        <div v-if="showType=='bayue'">
          <img style="width: 100%;height: 100%;" src="@/assets/paiqi.jpg">
        </div>

          <div style="display: flex;" v-if="showType=='ren'">
            <img style="margin-right: 20px;" src="@/assets/renyu.jpg"/>
            <!-- <el-descriptions
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
          <div v-if="showType=='ren'">
            <img src="@/assets/8yue.png"/>
          </div> -->
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

const { query } = useRoute()

const showType = ref('ren')


const detailId  = ref((query.id as unknown as number) && (query.id as unknown as number))

const zhangClick = () =>{
  showType.value = 'ren'
  nowDialogVisible.value = true
}

const bayueClick = () =>{
  showType.value = 'bayue'
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
  top: 50%;
  left: 22%;
  width: 100px;
  height: 100px;
  color: red;
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
  width: 15vw;
  height: 15vw;
  background: red;
  opacity:0
}


.bayue{
  position: absolute;
  top: 65%;
  left: 82%;
  width: 150px;
  height: 150px;
  background: red;
   opacity:0
}


</style>