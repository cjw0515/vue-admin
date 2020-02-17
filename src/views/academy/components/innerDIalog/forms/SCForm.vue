<template>
  <el-container>
    <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
      <el-input
        v-model="filterText"
        class="search-input"
        prefix-icon="el-icon-search"
        placeholder="search"
      />
      <el-button type="danger" icon="el-icon-remove-outline" size="mini" circle @click="resetChecked" />
      <el-tree
        ref="tree"
        :data="subjects"
        show-checkbox
        node-key="codeNo"
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode"
        default-expand-all
        empty-text="로딩중..."
        @check="handleClickChk"
      />
    </el-aside>
    <el-main>
      <div>
        <SCCard
          v-for="(data, idx) in formData.SCData"
          :key="idx"
          :data="data"
          :insti-id="instiId"
          :dialog-status="dialogStatus"
          :is-empty="isEmpty"
          :chked-nodes="chkedNodes"
        />
        <el-card shadow="hover" class="box-card">
          <el-button plain icon="el-icon-plus" @click="addSC" />
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { parseTime, getRandomNumber } from '@/utils/index'
import { getAMasterCodeTree } from '@/api/insti/master-code'
import SCCard from './SCForm-SCCard'

export default {
  components: { SCCard },
  props: {
    instiId: {
      type: Number,
      default: 0
    },
    masterData: {
      type: [Array, Object]
    },
    dialogStatus: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      chkedNodes: [],
      filterText: '',
      subjects: [],
      defaultProps: {
        children: 'children',
        label: 'codeName'
      },
      formData: this.masterData
    }
  },
  computed: {
    isEmpty: function() {
      return this.chkedNodes.length > 0
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
      this.resetChecked()
    }
  },
  created: function() {
    this.initialDataSetup()
  },
  mounted: function() {
  },
  methods: {
    addSC() {
      this.formData.SCData.push({
        itemName: 'SC',
        seq: 1,
        useYn: true,
        itemValue: '',
        itemProperty: '',
        inputVisible: false,
        inputValue: '',
        edit: false,
        editValue: ''
      })
    },
    initialDataSetup() {
      this.getAMasterCodeTree()
      this.formData.SCData = this.formData.SCData.map(o => ({
        ...o,
        inputVisible: false,
        inputValue: '',
        edit: false,
        editValue: o.itemValue
      }))
    },
    async getAMasterCodeTree() {
      const { data } = await getAMasterCodeTree(11000)
      this.subjects = data
    },
    filterNode(value, data) {
      if (!value) return true
      return data.codeName.indexOf(value) !== -1
    },
    handleClickChk(current, chkObj) {
      this.chkedNodes = chkObj.checkedNodes.map(o => o.codeName)
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.chkedNodes = this.$refs.tree.getCheckedNodes()
    },
    sendAdditionalInstiData() {
      return {}
    }
  }
}
</script>
<style scoped>
.tg-row {
  height: 30px;
}
.tg-row-10 {
  height: 10px;
}
.tg-t-text {
    font-size: 110%;
    color: indigo;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 800px;
}
.search-input {
  margin-bottom: 10px
}
.add-btn {
  /* border-right: 1px black */
  margin-right: 10px;
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.el-card {
  margin-bottom: 10px;
}
.card-name{
  margin-right: 10px;
}
.el-input {
  width: 250px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
