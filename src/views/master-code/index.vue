<template>
  <div class="app-container">
    <FilterContainer />
    <TableContainer v-if="tableData.length > 0" :table-data="tableData" @addValue="addAditionalValue" />
  </div>
</template>
<script>
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'
import {
  // getAMasterCode,
  getMasterCodes
  // modifyMasterCode
} from '@/api/master-code'

export default {
  components: { FilterContainer, TableContainer },
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
      tableData: []
    }
  },
  created: function() {
    this.getMasterCodes(0, 1)
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    },
    async getMasterCodes(parent_code, depth) {
      const data = await getMasterCodes(parent_code, depth)
      this.tableData = this.addAditionalValue(data)
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
