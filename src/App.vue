<script setup lang="ts">
import { ref,reactive } from 'vue';
import { ElTable,ElTableColumn } from 'element-plus';


const dataSource = ref([])

</script>

<template>
  <div class="content">
    <el-table :data="dataSource" class="table">
      <el-table-column label="列车班次"></el-table-column>
      <el-table-column label="起始站"></el-table-column>
      <el-table-column label="终点站"></el-table-column>
    </el-table>
  </div>

</template>

<style scoped>
  .content{
    width: 500px;
    height: 500px;
  } 
  .table{
    width: 100%;
    height: 100%;
  }

</style>
