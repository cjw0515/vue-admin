<template>
  <el-container>
    <el-aside>
      <el-input
        class="search-input"
        prefix-icon="el-icon-search"
        placeholder="search"
        v-model="filterText">
      </el-input>
      <el-tree
        :data="subjects"
        show-checkbox
        node-key="codeNo"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode"
        />
    </el-aside>
    <el-main>
      <div>
        <el-card shadow="hover" class="box-card"
          v-for="(data, idx) in formData.SJData"
          :key="idx"
        >
            <div slot="header" class="clearfix">
              <span class="card-name">{{data.label}}</span>
            </div>
            <el-button :type="getType(4)" icon="el-icon-arrow-right" circle class="add-btn" @click="addSubject(data.disp)"/>
            <el-tag
              v-for="sub in data[data.disp]"
              :key="sub.idx"
              closable
              :type="sub.type"
              :disable-transitions="false"
              @close="handleClickDeleteBtn(data.disp, sub.idx)">
              {{sub.disp}}
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
    }
  },
  data: () => ({
    filterText: '',
    subjects: [],
    defaultProps: {
      children: 'children',
      label: 'codeName'
    },
    formData: {
      SJData: [
        {
          disp: 'OSData', label: '개설 과목',
          OSData: []
        },
        {
          disp: 'R1Data', label: '공통',
          R1Data: [],
        },
        {
          disp: 'R2Data', label: '초등',
          R2Data: [],
        },
        {
          R3Data: [],
          disp: 'R3Data', label: '중등'
        },
        {
          disp: 'R4Data', label: '고등',
          R4Data: [],
        },
        {
          disp: 'R5Data', label: 'N수',
          R5Data: [],
        }
      ]
    }
  }),
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted: function() {
    this.initialDataSetup()
  },
  methods: {
    initialDataSetup(){
      this.getAMasterCodeTree()
    },    
    async getAMasterCodeTree(){
      const { data } = await getAMasterCodeTree(1)
      this.subjects = data
      this.addToInitialData()
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.codeName.indexOf(value) !== -1;
    },
    getType(idx){
      const types = ['success', 'info', 'warning', 'danger', '']
      return types[(idx + 1) % types.length]
    },
    handleClickDeleteBtn(arrName, key){
      this.formData.SJData.forEach(o => {
        if(o[arrName]){
          o[arrName] = o[arrName].reduce((pre, value) => {
            if(value.idx != key){
              pre.push(value)
            }
            return pre
          }, [])
        }
      })
    },
    addToInitialData(){
      this.formData.SJData.forEach(o => {
        o[o.disp] = o[o.disp].map((sub, idx) => {
          return {
            ...sub,
            idx: idx,
            type: this.getType(idx)
          }
        })
      })
    },
    addSubject(arrName){
      if(!arrName) return false;
      let gdn = ''
      const checkArr = this.$refs.tree.getCheckedNodes()
      if(checkArr.length <= 0) return false;

      switch (arrName) {
        case 'OSData':
          gdn = 'OS'
          break;
        case 'R1Data':
          gdn = 'R1'
          break;
        case 'R2Data':
          gdn = 'R2'
          break;
        case 'R3Data':
          gdn = 'R3'
          break;
        case 'R4Data':
          gdn = 'R4'
          break;
        case 'R5Data':
          gdn = 'R5'
          break;
        default:
          gdn = ''
          break;
      }
      this.formData.SJData.forEach(o => {
        if(o[arrName]){
          checkArr.forEach(c => {
            o[arrName].push({
              gdn: gdn,
              codeNo: c.codeNo,
              useYn: true,
              disp: c.codeName
            })
          })
          this.addToInitialData()
        }
      })

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
  height: 500px;
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
}
.el-card {
  margin-bottom: 10px;
}
</style>
