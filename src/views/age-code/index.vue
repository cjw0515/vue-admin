<template>
  <div class="app-container">
    <FilterContainer />
    <TableContainer
      v-if="tableData.length > 0"
      v-loading="listLoading"
      :table-data="tableData"
      :total="total"
      :list-query="listQuery"
      @addValue="addAditionalValue"
      @getList="getcodeAges"
    />
  </div>
</template>
<script>
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'
import { getcodeAges } from '@/api/age-code'

export default {
  components: { FilterContainer, TableContainer },
  data() {
    return {
      listQuery: {
        page: 1,
        perPage: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      listLoading: true,
      total: 0,
      importanceOptions: [1, 2, 3],
      tableData: []
    }
  },
  created: function() {
    this.getcodeAges(this.listQuery)
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    },
    async getcodeAges(query) {
      this.listLoading = true
      const { data } = await getcodeAges(query)
      this.tableData = this.addAditionalValue(data.list)
      this.listQuery.perPage = data.perPage
      this.total = data.total
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    },
    addAditionalValue(arr) {
      if (arr.length <= 0) return []
      return arr.map(el => {
        this.$set(el, 'edit', false)
        el.originalAge = el.age
        el.originalGbn = el.gbn
        el.originalAgeName = el.ageName
        el.originalStatus = el.status
        return el
      })
    }
  }
}
</script>
<style>
</style>
