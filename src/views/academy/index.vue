<template>
  <div class="app-container">
    <FilterContainer
      :list-query="listQuery"
      :options="options"
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
    <FormDialog :form-dialog-data="formDialogData" @toggleDialog="toggleDialog" :key="getKey()"/>
  </div>
</template>
<script>
import FilterContainer from './components/FilterContainer'
import TableContainer from './components/TableContainer'
import FormDialog from './components/FormDialog'
import { getAcademies } from '@/api/insti/academy'
import { createUniqueString, parseTime } from '@/utils/index'

export default {
  components: { FilterContainer, TableContainer, FormDialog },
  data() {
    return {
      listQuery: {
        page: 1,
        perPage: 10,
        query: '',
        queryType: '',
        chkOption: '',
        sort: '+id'
      },
      options: {
        queryOptions: [
          { label: '이름', value: 'instiName' },
          { label: '학원번호', value: 'instiNumber' }
        ],
        chkOptions: [
          { label: '확인', value: 1 },
          { label: '미확인', value: 0 }
        ]
      },
      listLoading: false,
      total: 0,
      tableData: [],
      formDialogData: {
        formDialogVisible: false,
        dialogStatus: 'create',
        textMap: {
          update: '학원 수정',
          create: '학원 추가'
        },
        width: '75%',
        formLabelWidth: '120px',
        labelPosition: 'left',
        idx: 0
      },
      tmpRow: {}
    }
  },
  created: function() {
    this.getAcademies(this.listQuery)
  },
  methods: {
    async getAcademies(query, page) {
      if (page) {
        this.listQuery.page = page
      }
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
    toggleDialog(mode, idx) {
      this.formDialogData = {
        ...this.formDialogData,
        formDialogVisible: !this.formDialogData.formDialogVisible,
        dialogStatus: mode || 'create',
        idx: idx
      }
    },
    getKey() {
      return createUniqueString()
    }
  }
}
</script>
<style>
</style>
