<template>
  <div>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column label="메뉴명" width="250" prop="name" />
    </el-table>

    <!-- 다이얼로그 -->
    <el-dialog title="코드 수정" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="코드" :label-width="formLabelWidth">{{ form.codeNo }}</el-form-item>
        <el-form-item label="코드 명" :label-width="formLabelWidth">
          <el-input v-model="form.codeName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleClickConfirm()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getMasterCodes, updateMasterCode } from '@/api/insti/master-code'
import { parseTime } from '@/utils/index'

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
  mounted: function() {},
  methods: {
    async handleEdit(row, modPayload) {
      const payload = !modPayload
        ? {
          codeName: row.codeName,
          status: row.status
        }
        : modPayload
      try {
        await updateMasterCode(row.codeNo, payload)
        this.$notify({
          title: 'Success!',
          message: '업데이트 되었습니다!',
          type: 'success',
          duration: 2000
        })
        return true
      } catch (err) {
        row.status = row.status === '1' ? '0' : '1'
      }
    },
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
    },
    async load(row, treeNode, resolve) {
      const res = await getMasterCodes(row.codeNo, row.depth + 1)
      const tmpArr = res.map(el => {
        return {
          ...el,
          hasChildren: el.childCnt > 0
        }
      })
      resolve(tmpArr)
    },
    dispTime(time) {
      return parseTime(time, '{y}-{m}-{d}')
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
