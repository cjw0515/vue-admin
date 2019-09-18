<template>
  <div class="app-container">
    <FilterContainer />
    <TableContainer
      v-if="tableData.length > 0"
      :table-data="tableData"
      @addValue="addAditionalValue"
      @getList="getcodeAges"
    />
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'
import {
  getcodeAges
} from '@/api/age-code'

export default {
  components: { FilterContainer, TableContainer },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
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
      const { data } = await getcodeAges(query)
      this.tableData = data
    },
    addAditionalValue(arr) {
      if (arr.length <= 0) return []
      return arr.map(el => {
        return {
          ...el,
          hasChildren: el.childCnt > 0
        }
      })
    }
  }
}
</script>
<style>
</style>
