<template>
  <div>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%; cursor: pointer"
      @row-click="handleRowClick"
    >
      <el-table-column label="학원번호" width="100">
        <template slot-scope="{row}">
          <span>{{ row.instiNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="이름" width="350">
        <template slot-scope="{row}">
          <span>{{ row.instiName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="과목" width="220">
        <template slot-scope="{row}">
          <span>{{ row.category1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="주소" width="500">
        <template slot-scope="{row}">
          <span>{{ row.address1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="확인일" width="220" align="center">
        <template slot-scope="{row}">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ dispTime(row.confirmDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="수정" fixed="right" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click.native.prevent="handleClickEdit(row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.perPage"
      layout="prev, pager, next"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { updateCodeAge } from '@/api/insti/age-code'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    listQuery: {
      type: Object,
      defualt: function() {
        return {
          page: 1,
          perPage: 10,
          query: '',
          queryType: '',
          sort: '+id'
        }
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
      formLabelWidth: '120px',
      page: this.listQuery.page,
      perPage: this.listQuery.perPage
    }
  },
  mounted: function() {},
  methods: {
    async handleEdit(row) {
      const codeKeys = {
        ageNo: row.originalAge,
        gbn: row.originalGbn,
        ageName: row.originalAgeName
        // status: row.status
      }
      const payload = {
        status: row.status,
        ageNo: row.age,
        gbn: row.gbn,
        ageName: row.ageName
      }
      try {
        await updateCodeAge(codeKeys, payload)
        this.$message({
          message: '수정되었습니다!',
          type: 'success'
        })
        row.originalAge = row.age
        row.originalGbn = row.gbn
        row.originalAgeName = row.ageName
        row.edit = false
      } catch (err) {
        row.status = row.status === '1' ? '0' : '1'
        row.age = row.originalAge
        row.gbn = row.originalGbn
        row.ageName = row.originalAgeName
      }
    },
    handleClickEdit(row) {
      this.$emit('toggleDialog', 'update', row.instiNumber)
    },
    getList() {
      this.$emit('getList', this.listQuery)
    },
    dispTime(time) {
      return time ? parseTime(time, '{y}-{m}-{d}') : '- - -'
    },
    cancelEdit(row) {
      row.age = row.originalAge
      row.gbn = row.originalGbn
      row.ageName = row.originalAgeName
      row.status = row.originalStatus
      row.edit = false
      this.$message({
        message: '수정 취소',
        type: 'warning'
      })
    },
    tableRowClassName({ row, rowIndex }) {
      return row.status === '0' ? 'warning-row' : ''
    },
    dispNull(v) {
      return v || '-'
    },
    handleRowClick(row, column, event) {
      if (column.label === '수정') return false
      console.log(row, column)
    }
  }
}
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
