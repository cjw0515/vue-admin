<template>
  <div class="filter-container">
    <el-select
      ref="queryTypeBox"
      v-model="listQuery.queryType"
      placeholder="검색 조건"
      clearable
      style="width: 180px"
      class="filter-item"
      @change="resetQuery"
    >
      <el-option v-for="item in options.queryOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input
      v-model="listQuery.query"
      :placeholder="selectedOption"
      style="width: 200px;"
      class="filter-item"
      @keyup.native="chkSelectBox()"
    />
    <el-button
      class="filter-item"
      type="primary"
      icon="el-icon-search"
      @click="handleSearch"
    >Search</el-button>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleClickAdd">
      Add
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    listQuery: {
      type: Object,
      defualt: function() {
        return {}
      }
    },
    options: {
      type: Object,
      defualt: function() {
        return {}
      }
    },
    formDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

      // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }]
    }
  },
  computed: {
    selectedOption: function() {
      return this.listQuery.queryType
    }
  },
  mounted: function() {

  },
  methods: {
    handleSearch() {
      this.$emit('getList', this.listQuery, 1)
    },
    resetQuery() {
      this.listQuery.query = ''
    },
    chkSelectBox() {
      if (!this.$refs.queryTypeBox.value) {
        this.resetQuery()
        this.$refs.queryTypeBox.focus()
      }
    },
    handleClickAdd() {
      this.$emit('toggleDialog')
    }
  }
  // watch: {
  //   listQuery: {
  //     handler: function(){this.listQuery.query = ''},
  //     deep: true
  //   }
  // }
}
</script>
<style>
</style>
