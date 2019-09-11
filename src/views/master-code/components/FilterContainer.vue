<template>
  <div class="filter-container">
    <el-input
      v-model="listQuery.title"
      placeholder="Title"
      style="width: 200px;"
      class="filter-item"
    />
    <el-select
      v-model="listQuery.importance"
      placeholder="Imp"
      clearable
      style="width: 90px"
      class="filter-item"
    >
      <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
    </el-select>
    <el-select
      v-model="listQuery.sort"
      style="width: 140px"
      class="filter-item"
    >
      <el-option
        v-for="item in sortOptions"
        :key="item.key"
        :label="item.label"
        :value="item.key"
      />
    </el-select>
    <el-button
      class="filter-item"
      type="primary"
      icon="el-icon-search"
    >Search</el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
    >Add</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }]
    }
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    }
  }
}
</script>
<style>
</style>
