<template>
  <div>
    <img style="width: 100%;height: 100%;" src="@/assets/home.jpg" @click="bgHandle"/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()


const bgHandle = () =>{

  router.push('/train-timetable/login')

}

</script>