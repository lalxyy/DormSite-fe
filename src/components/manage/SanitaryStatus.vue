<template>
  <div>
    <el-table :data="sanitaryData" stripe style="width: 100%">
      <el-table-column prop="roomNumber" label="Room Number" width="180"></el-table-column>
      <el-table-column label="Sanitary Records">
        <template slot-scope="scope">
          <!--<el-table-column v-for="record in scope.row.statuses" :label="scope.row."-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'SanitaryStatus',
    data () {
      return {
        sanitaryData: [],
        checkingTimes: []
      }
    }
  }
</script>

<style>
  /**/
</style>
