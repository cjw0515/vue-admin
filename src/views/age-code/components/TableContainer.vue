<template>
  <div>
    <!-- 나이 | 분류코드 / 코드명 | 명칭 | 사용여부 | 동작  -->
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column label="나이" width="250" prop="age" />
      <el-table-column label="분류코드 / 코드명" width="220">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gbn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="명칭" width="220">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="사용여부" width="220">
        <template slot-scope="scope">
          <el-switch v-model.lazy="scope.row.status" active-value="1" inactive-value="0" active-text="사용" inactive-text="사용 안함" @change="handleEdit(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdateName(row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList" /> -->
  </div>
</template>
<script>
// import { getMasterCodes, updateMasterCode } from '@/api/age-code'
// import { parseTime } from '@/utils/index'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
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
  },
  methods: {
    // async handleEdit(row, modPayload) {
    //   const payload = !modPayload ? {
    //     codeName: row.codeName,
    //     status: row.status
    //   } : modPayload
    //   try {
    //     // const res = await updateMasterCode(row.codeNo, payload)
    //     this.$notify({
    //       title: 'Success!',
    //       message: '업데이트 되었습니다!',
    //       type: 'success',
    //       duration: 2000
    //     })
    //     return true
    //   } catch (err) {
    //     row.status = row.status === '1' ? '0' : '1'
    //   }
    // },
    handleUpdateName(row) {
      this.dialogFormVisible = true
      this.form.codeName = row.codeName
      this.form.codeNo = row.codeNo
      this.tmpRow = row
    },
    handleClickConfirm() {
      const payload = {
        codeName: this.form.codeName,
        status: this.tmpRow.status
      }
      if (this.handleEdit(this.tmpRow, payload)) {
        this.dialogFormVisible = false
        this.tmpRow.codeName = this.form.codeName
      }
    },
    tableRowClassName({ row, rowIndex }) {
      return row.status === '0' ? 'warning-row' : ''
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
