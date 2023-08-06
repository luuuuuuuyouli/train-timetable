<template>
    <div>
        <img class="bg_img" src="@/assets/main.png"/>
        <div class="list">
            <div v-for="item in 12" :key="item" class="list_item" @click="pushDetail(item)"></div>
        </div>
        
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const pushDetail = (index) =>{
    console.log('跳转',index)

    if (index == 3){
        router.push('/train-timetable/main')
    }else{
        router.push({
            path:'/train-timetable/detail',
            query:{
                id:index
            }
        })
    }

    
}


</script>

<style lang="less" scoped>

.bg_img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
}

.list{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
}

.list_item{
    width: 33%;
    height: 25%;
    margin-left: 2px;
    margin-bottom: 2px;
    opacity:0
    
}


</style>