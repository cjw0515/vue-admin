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
        <el-card
          v-for="(data, key, idx) in formData.SJData"
          :key="idx"
          shadow="hover"
          class="box-card"
        >
          <div slot="header" class="clearfix">
            <span class="card-name">{{ data.label }}</span>
            <el-button v-if="dialogStatus == 'update'" type="primary" icon="el-icon-download" size="mini" circle @click="refreshSubjects(data.disp)" />
            <el-button type="danger" icon="el-icon-remove-outline" size="mini" circle @click="resetSubject(data.disp)" />
          </div>
          <el-button :type="isEmpty ? getType(4) : getType(0)" icon="el-icon-arrow-right" circle class="add-btn" @click="addSubject(data.disp)" />
          <el-tag
            v-for="sub in data.list"
            :key="sub.idx"
            closable
            :type="sub.type"
            :disable-transitions="false"
            @close="handleClickDeleteBtn(data.disp, sub.idx)"
          >
            {{ sub.disp }}
          </el-tag>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { parseTime, getRandomNumber } from '@/utils/index'
import { getAMasterCodeTree } from '@/api/insti/master-code'

export default {
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
    initialDataSetup() {
      this.getAMasterCodeTree()
    },
    sendAdditionalInstiData() {
      return {}
    },
    async getAMasterCodeTree() {
      const { data } = await getAMasterCodeTree(11000)
      this.subjects = data
      this.addToInitialData()
    },
    refreshSubjects(dataKey) {
      this.formData.SJData[dataKey].list = this.getSubjects()
    },
    resetSubject(dataKey) {
      this.formData.SJData[dataKey].list = []
    },
    getSubjects(dataKey) {
      return []
    },
    filterNode(value, data) {
      if (!value) return true
      return data.codeName.indexOf(value) !== -1
    },
    getType(idx) {
      const types = ['success', 'info', 'warning', 'danger', '']
      return types[(idx + 1) % types.length]
    },
    handleClickDeleteBtn(dataKey, key) {
      this.formData.SJData[dataKey].list = this.formData.SJData[dataKey].list.reduce((pre, value) => {
        if (value.idx != key) {
          pre.push(value)
        }
        return pre
      }, [])
    },
    handleClickChk(current, chkObj) {
      this.chkedNodes = chkObj.checkedKeys
    },
    addToInitialData() {
      const idx = 0
      for (const key in this.formData.SJData) {
        this.formData.SJData[key].list = this.formData.SJData[key].list.map((sub, idx) => ({
          ...sub,
          idx: idx++,
          type: this.getType(idx)
        }))
      }
    },
    getgbn(dataKey) {
      let gbn = ''
      switch (dataKey) {
        case 'OSData':
          gbn = 'OS'
          break
        case 'R1Data':
          gbn = 'R1'
          break
        case 'R2Data':
          gbn = 'R2'
          break
        case 'R3Data':
          gbn = 'R3'
          break
        case 'R4Data':
          gbn = 'R4'
          break
        case 'R5Data':
          gbn = 'R5'
          break
        default:
          gbn = ''
          break
      }
      return gbn
    },
    addSubject(dataKey) {
      if (!dataKey) return false
      let gbn = ''
      const checkArr = this.$refs.tree.getCheckedNodes()
      if (checkArr.length <= 0) {
        this.$message({
          message: '추가할 과목을 입력해주세요.',
          type: 'warning'
        })
        return false
      }
      gbn = dataKey.substr(0, 2)
      if (!gbn) return false
      let addArr = checkArr.map(c => {
        return {
          gbn: gbn,
          codeNo: c.codeNo,
          useYn: true,
          disp: c.codeName
        }
      })
      addArr = this.chkDuplication(addArr, dataKey)
      this.formData.SJData[dataKey].list = addArr
      this.addToInitialData()
    },
    chkDuplication(chkedArr, dataKey) {
      let targetArr = []
      targetArr = this.formData.SJData[dataKey].list
      const mergedArr = [...chkedArr, ...targetArr]
      const uniq = mergedArr.filter(
        (obj, idx, self) => idx === self.findIndex(t => t.disp == obj.disp)
      )
      if (mergedArr.length != uniq.length) {
        this.$message({
          message: '중복된 데이터는 제거됩니다.',
          type: 'warning'
        })
      }
      return uniq
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.chkedNodes = this.$refs.tree.getCheckedNodes()
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
</style>
