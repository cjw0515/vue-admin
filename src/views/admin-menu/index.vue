<template>
  <div class="app-container">
    <FilterContainer
      :list-query="listQuery"
      :options="options"
      @toggleDialog="toggleDialog"
      @getAdminMenus="getAdminMenus"    
    />
    <TableContainer 
      v-if="tableData.length > 0" 
      v-loading="listLoading"      
      :table-data="tableData" 
    />
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
      importanceOptions: [1, 2, 3],
      tableData: [],
      formDialogData: {
        formDialogVisible: false,
        dialogStatus: 'create',
        textMap: {
          update: '학원 수정',
          create: '학원 추가'
        },
        width: '50%',
        formLabelWidth: '120px',
        idx: 0
      },      
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
    },
    toggleDialog(mode, idx) {
      this.formDialogData = {
        ...this.formDialogData,
        formDialogVisible: !this.formDialogData.formDialogVisible,
        dialogStatus: mode || 'create',
        idx: idx
      }
    }    
  }
}
</script>
<style>
</style>
