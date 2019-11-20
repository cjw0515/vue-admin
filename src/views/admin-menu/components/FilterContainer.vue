<template>
  <div class="filter-container">
    <el-select
      v-model="listQuery.chkOption"
      placeholder="확인/미확인"
      clearable
      style="width: 140px"
      class="filter-item"
      @change="handleSearch"
    >
      <el-option v-for="item in options.chkOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input
      v-model="listQuery.title"
      placeholder="Title"
      style="width: 200px;"
      class="filter-item"
    />
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
      @click="handleClickAdd"
    >Add</el-button>    
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: this.listQuery.query
    }
  },
  props: {
    listQuery: {
      type: Object,
      defualt: function() {
        return {
          page: 1,
          perPage: 10,
          query: '',
          queryType: '',
          chkOption: '',
          sort: '+id'
        }
      }
    },
    options: {
      type: Object,
      defualt: function() {
        return {
          queryOptions: [
            { label: '이름', value: 'instiName' },
            { label: '학원번호', value: 'instiNumber' }
          ]
        }
      }
    }
  },  
  methods: {
    handleSearch() {
      // this.$emit('getList', { ...this.listQuery, query: this.query }, 1)
    },    
    handleFilter() {
      this.listQuery.page = 1
    },
    handleClickAdd() {
      // this.$emit('toggleDialog', 'create')
    }    
  }
}
</script>
<style>
</style>
