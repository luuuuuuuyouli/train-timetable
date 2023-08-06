<template>
     <div class="title">智慧信息指挥室</div>
     <img v-if="detailId==1" style="width: 100%;height: 100%;" src="@/assets/line.jpg"/>
     <img v-if="detailId==2" style="width: 100%;height: 100%;" src="@/assets/ren.png"/>
     <img v-if="detailId==4" style="width: 100%;height: 100%;" src="@/assets/pai.png"/>
     <img v-if="detailId==5" style="width: 100%;height: 100%;" src="@/assets/rili.png"/>
</template>


<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router'



const currentUrl = ref()
const { query } = useRoute()

const detailId  = ref((query.id as unknown as number) && (query.id as unknown as number))



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

</style>