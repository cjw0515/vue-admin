<template>
  <div>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      row-key="codeNo"
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
    >
      <el-table-column label="코드명" width="250" prop="codeName" />
      <el-table-column label="코드" width="220">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.codeNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="등록일" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ dispTime(scope.row.regDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="사용여부" width="220">
        <template slot-scope="scope">
          <el-switch
            v-model.lazy="scope.row.status"
            active-value="1"
            inactive-value="0"
            active-text="사용"
            inactive-text="사용 안함"
            @change="handleEdit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdateName(row)">Edit</el-button>
        </template>
      </el-table-column>
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
        this.$message({
          message: '수정되었습니다!',
          type: 'success'
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
