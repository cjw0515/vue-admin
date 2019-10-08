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
    <el-select
      ref="queryTypeBox"
      v-model="listQuery.queryType"
      placeholder="검색 조건"
      clearable
      style="width: 180px"
      class="filter-item"
      @change="resetQuery"
    >
      <el-option
        v-for="item in options.queryOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input
      v-model="query"
      :placeholder="selectedOption"
      style="width: 200px;"
      class="filter-item"
      @keyup.native="handleKeyup($event)"
    />
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
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
  data() {
    return {
      query: this.listQuery.query
    }
  },
  computed: {
    selectedOption: function() {
      return this.listQuery.queryType
    }
  },
  mounted: function() {},
  methods: {
    handleSearch() {
      this.$emit('getList', { ...this.listQuery, query: this.query }, 1)
    },
    resetQuery() {
      this.query = ''
    },
    handleKeyup(e) {
      if (e.keyCode === 13) {
        this.handleSearch()
        return false
      }
      if (!this.$refs.queryTypeBox.value) {
        this.resetQuery()
        this.$refs.queryTypeBox.focus()
      }
    },
    handleClickAdd() {
      this.$emit('toggleDialog', 'create')
    }
  }
}
</script>
<style>
</style>
