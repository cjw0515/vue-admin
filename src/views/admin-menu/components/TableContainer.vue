<template>
  <div>
    <el-table
      :data="filterMenu(tableData)"
      :row-class-name="tableRowClassName"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column label="메뉴명" width="250" prop="meta.title" />
      <el-table-column label="등록일" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ dispTime(scope.row.regDate) }}</span>
        </template>
      </el-table-column>  
      <el-table-column label="등록자" width="250" prop="regUser" />
      <el-table-column label="수정일" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ dispTime(scope.row.updateDate) }}</span>
        </template>
      </el-table-column>  
      <el-table-column label="최종 수정자" width="250" prop="lastModUser" />
      <el-table-column label="노출여부" width="220" fixed="right">
        <template slot-scope="scope">
          <el-switch
            v-model.lazy="scope.row.hidden"
            inactive-text="노출"
            active-text="숨김"
            @change="handleEdit(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { updateMenu } from '@/api/admin/admin-menu'
import { parseTime } from '@/utils/index'
import router from '@/router'
import store from '@/store'

export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    listQuery: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        codeName: '',
        codeNo: ''
      },
      tmpRow: {},
      formLabelWidth: '120px'
    }
  },
  mounted: function() {
    // console.log(this.tableData)
  },
  methods: {
    async handleEdit(row, modPayload) {
      const payload = !modPayload
      ? {
        id: row.id,
        status: row.hidden
      }
      : modPayload
      try {
        await updateMenu(payload)
        this.$message({
          message: '수정되었습니다!',
          type: 'success'
        })
        this.resetRouter()
        return true
      } catch (err) {
        row.hidden = row.hidden === true ? false : true
      }
    },
    tableRowClassName({ row, rowIndex }) {
      return row.hidden === true ? 'warning-row' : ''
    },
    dispTime(time) {
      return time ? parseTime(time, '{y}-{m}-{d}') : '-'
    },
    async resetRouter(){
      // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      const { roles } = await store.dispatch('user/getInfo')
      // generate accessible routes map based on roles
      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)
    },
    filterMenu(tableData){
      return tableData.filter(data => !this.listQuery.query || data.meta.title.toLowerCase().includes(this.listQuery.query.toLowerCase()))
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
