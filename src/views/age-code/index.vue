<template>
  <div class="app-container">
    <FilterContainer
      :list-query="listQuery"
      :options="options"
      :form-dialog-visible="formDialogVisible"
      @getList="getcodeAges"
      @toggleDialog="toggleDialog"
    />
    <TableContainer
      v-if="tableData.length > 0"
      v-loading="listLoading"
      :table-data="tableData"
      :total="total"
      :list-query="listQuery"
      @addValue="addAditionalValue"
      @getList="getcodeAges"
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
import { getcodeAges } from '@/api/insti/age-code'

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
        queryOptions: [{ label: '나이', value: 'age' }, { label: '명칭', value: 'ageName' }],
        codeTypesOptions: [
          { label: '별칭(A)', value: 'A' },
          { label: '그룹(C)', value: 'C' },
          { label: '공식명칭(O)', value: 'O' }
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
    this.getcodeAges(this.listQuery)
  },
  methods: {
    async getcodeAges(query, page) {
      if (page) { this.listQuery.page = page }
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
    },
    toggleDialog() {
      this.formDialogVisible = !this.formDialogVisible
    }
  }
}
</script>
<style>
</style>
