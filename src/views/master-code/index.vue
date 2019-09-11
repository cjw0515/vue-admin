<template>
  <div class="app-container">
    <FilterContainer />
    <TableContainer />
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'

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
      importanceOptions: [1, 2, 3]
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
