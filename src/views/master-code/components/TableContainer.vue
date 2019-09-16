<template>
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
        <span style="margin-left: 10px">{{ scope.row.regDate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="사용여부" width="220">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.status" active-text="사용" inactive-text="사용 안함" />
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template slot-scope="">
        <el-button type="primary" size="mini">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getMasterCodes } from '@/api/master-code'

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
    return {}
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    tableRowClassName({ row, rowIndex }) {
      if (!row.status) {
        return 'warning-row'
      }
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      return ''
    },
    async load(row, treeNode, resolve) {
      const res = await getMasterCodes(row.codeNo, row.depth + 1)
      const tmpArr = res.map(el => {
        return {
          ...el,
          status: el.status === 1,
          hasChildren: el.depth >= 0
        }
      })
      resolve(tmpArr)
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
