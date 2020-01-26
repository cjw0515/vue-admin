<template>
  <div>
    <el-row>
      <div><span class="tg-t-text">주 대상</span></div><div class="tg-row-10"/>        
      <el-col :span="4" v-for="(tg, idx) in formData.targetGrades" :key="idx">
        <el-checkbox-button
          true-label='1'
          false-label='0'
          v-model="tg.itemProperty"          
        >{{tg.itemValue}}</el-checkbox-button>
        <div class="tg-row"/>        
        <el-checkbox true-label='1' false-label='0' ref="allButtons" @change="handleCheckAllChange(idx)">all</el-checkbox>
        <div class="tg-row-10"/>        
        <el-checkbox
          v-for="tgLevel in tg.targetLevels"
          @change="handleCheckBox(idx)"
          :key="tgLevel.codeNo"
          v-model="tgLevel.useYn"          
        >{{tgLevel.disp}}</el-checkbox>
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
    }
  },
  data: () => ({
    formData: {
      targetGrades: [
        { itemName: 'TG', seq: 1, itemValue: '유치원', itemProperty: '0', targetLevels: [{ gdn: 'AG', codeNo: 7, useYn: false, disp: '유치원' }] },
        { itemName: 'TG', seq: 2, itemValue: '초등', itemProperty: '0',
          targetLevels: [
            { gdn: 'AG', codeNo: 8, useYn: false, disp: '초1' },
            { gdn: 'AG', codeNo: 9, useYn: false, disp: '초2' },
            { gdn: 'AG', codeNo: 10, useYn: false, disp: '초3' },
            { gdn: 'AG', codeNo: 11, useYn: false, disp: '초4' },
            { gdn: 'AG', codeNo: 12, useYn: false, disp: '초5' },
            { gdn: 'AG', codeNo: 13, useYn: false, disp: '초6' }
          ]
        },
        { itemName: 'TG', seq: 3, itemValue: '중등', itemProperty: '0',
          targetLevels: [
            { gdn: 'AG', codeNo: 14, useYn: false, disp: '중1' },
            { gdn: 'AG', codeNo: 15, useYn: false, disp: '중2' },
            { gdn: 'AG', codeNo: 16, useYn: false, disp: '중3' }
          ]
        },
        { itemName: 'TG', seq: 4, itemValue: '고등', itemProperty: '0',
          targetLevels: [
            { gdn: 'AG', codeNo: 17, useYn: false, disp: '고1' },
            { gdn: 'AG', codeNo: 18, useYn: false, disp: '고2' },
            { gdn: 'AG', codeNo: 19, useYn: false, disp: '고3' }
          ]
        },
        { itemName: 'TG', seq: 5, itemValue: 'N수', itemProperty: '0', targetLevels: [{ gdn: 'AG', codeNo: 20, useYn: false, disp: 'N수' }] }
      ]
    }
  }),
  watch: {
    'formData.openFlexYn': {
      handler: function(v) {
        this.convertDateValue()
      }
    }
  },
  mounted: function() {
  },
  methods: {
    setOperationStat(item) {
      this.convertDateValue()
    },
    handleCheckAllChange(idx){
      if(this.$refs['allButtons'][idx].model === "1"){
        this.formData.targetGrades[idx].targetLevels.forEach(levs => {
          levs.useYn = true
        });
      }else{
        this.formData.targetGrades[idx].targetLevels.forEach(levs => {
          levs.useYn = false
        });
      }
    },
    handleCheckBox(idx){
      let maxChk = this.formData.targetGrades[idx].targetLevels.length
      let chked = this.formData.targetGrades[idx].targetLevels.filter(el => el.useYn)
      if(maxChk != chked.length){
        this.$refs['allButtons'][idx].model = "0"
      }else{
        this.$refs['allButtons'][idx].model = "1"
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
