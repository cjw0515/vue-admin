<template>
  <div>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="test1" prop="test1" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.test1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="test2" prop="test2" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.test2 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          test1: 'hi',
          test2: 'hi2'
        },
        {
          test1: 'hi',
          test2: 'hi2'
        }
      ]
    }
  }
}
</script>
<style>

</style>
