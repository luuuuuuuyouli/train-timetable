<template>
  <div>
    <img src="@/assets/bg.jpg" @click="pushMain"/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const pushMain = () =>{


  router.push('/train-timetable/main')

}

</script>