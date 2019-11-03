<template>
  <div class="app-container">
    <FilterContainer />
    <TableContainer v-if="tableData.length > 0" :table-data="tableData" />
  </div>
</template>
<script>
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'
import { getAdminMenus } from '@/api/admin/admin-menu'

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
    this.getAdminMenus()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    },
    async getAdminMenus() {
      const { data } = await getAdminMenus()
      this.tableData = data
    }
  }
}
</script>
<style>
</style>
