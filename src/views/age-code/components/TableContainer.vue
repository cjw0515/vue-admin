<template>
  <div>
    <!-- 나이 | 분류코드 / 코드명 | 명칭 | 사용여부 | 동작  -->
    <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%">
      <el-table-column label="나이" width="250">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.age" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="분류코드 / 코드명" width="220">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.gbn" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.gbn }}</span>
        </template>
      </el-table-column>

      <el-table-column label="명칭" width="220">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.ageName" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.ageName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="330">
        <template slot-scope="{row}">
          <div v-if="row.edit">
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="handleEdit(row)"
            >Ok</el-button>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >cancel</el-button>
          </div>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >Edit</el-button>
        </template>
      </el-table-column>

      <el-table-column label="사용여부" width="220" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model.lazy="scope.row.status"
            :disabled="scope.row.edit"
            active-value="1"
            inactive-value="0"
            active-text="사용"
            inactive-text="사용 안함"
            @change="handleEdit(scope.row)"
          />
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
// import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
        return {}
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
    getList() {
      this.$emit('getList', this.listQuery)
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
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
