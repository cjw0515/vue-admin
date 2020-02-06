<template>
  <div>
    <el-row>
      <div><span class="tg-t-text">주 대상 / 대상학년</span></div><div class="tg-row-10" />
      <el-col v-for="(tg, idx) in formData.TGData" :key="idx" :span="4">
        <el-checkbox-button
          v-model="tg.itemProperty"
          true-label="1"
          false-label="0"
        >{{ tg.itemValue }}</el-checkbox-button>
        <div class="tg-row" />
        <el-checkbox ref="allButtons" true-label="1" false-label="0" @change="handleCheckAllChange(idx)">all</el-checkbox>
        <div class="tg-row-10" />
        <el-checkbox
          v-for="tgLevel in tg.targetLevels"
          :true-label="trueVal"
          :false-label="falseVal"
          :key="tgLevel.codeNo"
          v-model="tgLevel.useYn"
          @change="handleCheckBox(idx)"
        >{{ tgLevel.disp }}</el-checkbox>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'

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
  data: function(){
    return {
      formData: this.masterData,
      trueVal: 1,
      falseVal: 0
    }
  } 
    
  ,
  mounted: function() {
  },
  methods: {
    handleCheckAllChange(idx) {
      if (this.$refs['allButtons'][idx].model === '1') {
        this.formData.TGData[idx].targetLevels.forEach(levs => {
          levs.useYn = true
        })
      } else {
        this.formData.TGData[idx].targetLevels.forEach(levs => {
          levs.useYn = false
        })
      }
    },
    handleCheckBox(idx) {
      const maxChk = this.formData.TGData[idx].targetLevels.length
      const chked = this.formData.TGData[idx].targetLevels.filter(el => el.useYn)
      if (maxChk != chked.length) {
        this.$refs['allButtons'][idx].model = '0'
      } else {
        this.$refs['allButtons'][idx].model = '1'
      }
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
</style>
