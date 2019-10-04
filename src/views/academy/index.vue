<template>
  <div class="app-container">
    <FilterContainer
      :list-query="listQuery"
      :options="options"
      :form-dialog-visible="formDialogVisible"
      @getList="getAcademies"
      @toggleDialog="toggleDialog"
    />
    <TableContainer
      v-if="tableData.length > 0"
      v-loading="listLoading"
      :table-data="tableData"
      :total="total"
      :list-query="listQuery"
      @addValue="addAditionalValue"
      @getList="getAcademies"
      @toggleDialog="toggleDialog"
    />
    <FormDialog
      :form-dialog-visible="formDialogVisible"
      :form-label-width="formLabelWidth"
      @toggleDialog="toggleDialog"
    />
  </div>
</template>
<script>
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'
import FormDialog from './components/FormDialog'
import { getAcademies } from '@/api/insti/academy'

export default {
  components: { FilterContainer, TableContainer, FormDialog },
  data() {
    return {
      listQuery: {
        page: 1,
        perPage: 10,
        query: '',
        queryType: '',
        code: '',
        sort: '+id'
      },
      options: {
        queryOptions: [
          { label: '이름', value: 'instiName' },
          { label: '학원번호', value: 'instiNumber' }
        ]
      },
      listLoading: false,
      total: 0,
      tableData: [],
      formDialogVisible: false,
      tmpRow: {},
      formLabelWidth: '120px'
    }
  },
  created: function() {
    this.getAcademies(this.listQuery)
  },
  methods: {
    async getAcademies(query, page) {
      if (page) { this.listQuery.page = page }
      this.listLoading = true
      const { data } = await getAcademies(query)
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
        el.originalStatus = el.status
        return el
      })
    },
    toggleDialog() {
      console.log('edit clicked')
      this.formDialogVisible = !this.formDialogVisible
    }
  }
}
</script>
<style>
</style>
