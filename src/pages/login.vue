<script setup lang="ts">
import { useDesign } from '@/hooks/useDesign'
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
  ElCard,
  ElRow,
  ElMessageBox,
  ElMessage,
  ElInput } from 'element-plus';
  import { useRouter } from 'vue-router'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('login')


const loginLoading = ref(false)
const loginForm = reactive({
    username:'admin',
    password:'123456'
})
const router = useRouter()
const handleLogin = () =>{
  router.push('/train-timetable/menu')
}

</script>

<template>
   <div
    :class="prefixCls"
    class="h-[100%] relative overflow-hidden <xl:bg-v-dark <sm:px-10px <xl:px-10px <md:px-10px"
  >
    <div class="relative h-full flex mx-auto">
      <div
        :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px <xl:hidden`"
      >
      <el-card class="content">
        <div style="text-align: center;margin-bottom: 50px;font-size: x-large;">智慧信息指挥室登录</div>
        <el-form>
          <el-row style="maring-left: -10px; maring-right: -10px">
      <el-col :span="24" style="padding-left: 10px; padding-right: 10px">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
           
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" style="padding-left: 10px; padding-right: 10px">
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="handleLogin"
           
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        style="padding-left: 10px; padding-right: 10px; margin-top: -20px; margin-bottom: -20px"
      >
      </el-col>
      <el-col :span="24" style="padding-left: 10px; padding-right: 10px">
        <el-form-item>
          <el-button style="width: 100%;height: 45px;" :loading="loginLoading" type="primary" class="w-[100%]" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
        </el-form>

      </el-card>
    </div>
    </div>
  </div>

</template>



<style lang="less" scoped>

@prefix-cls: ~'@{namespace}-login';

.@{prefix-cls} {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}

.content{
    width: 500px;
    height: 300px;
    margin: auto;  
    position: absolute;  
    top: 0;  
    bottom: 0;  
    left: 0;  
    right: 0;  
}

</style>