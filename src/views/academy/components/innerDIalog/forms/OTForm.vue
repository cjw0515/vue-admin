<template>
  <div>
    <div class="day-row">
      <span class="flex-stat-text"><b>동일 시간</b></span>
      <el-switch
        v-model="formData.OTData.openFlexYn"
        active-text="예"
        inactive-text="아니오"
      />
      <el-time-picker
        v-model="formData.OTData.openFlexTime.prefixdTime"
        is-range
        :disabled="!formData.OTData.openFlexYn"
        format="HH:mm"
        range-separator="~"
        start-placeholder="시작시간"
        end-placeholder="종료시간"
      />
    </div>
    <div v-for="(item, idx) in formData.OTData.daysOT" :key="idx" class="day-row">
      <span class="day-text"><b>{{ item.itemValue }}</b></span>
      <el-switch
        v-model="item.openStat"
        active-text="운영"
        inactive-text="미운영"
        @change="setOperationStat(item)"
      />
      <el-time-picker
        v-if="!formData.OTData.openFlexYn"
        v-model="item.prefixdTime"
        is-range
        :disabled="!item.openStat"
        format="HH:mm"
        range-separator="~"
        start-placeholder="시작시간"
        end-placeholder="종료시간"
        @change="handlePickerChange"
      />
    </div>
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
      formData: {
        OTData: {
          openFlexYn: false,
          openFlexTime: { itemName: 'OT', seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] },
          daysOT: [
            { openStat: true, itemName: 'OT', seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', seq: 2, itemValue: '화', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', seq: 3, itemValue: '수', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', seq: 4, itemValue: '목', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', seq: 5, itemValue: '금', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', seq: 6, itemValue: '토', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] },
            { openStat: false, itemName: 'OT', seq: 7, itemValue: '일', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] }
          ]
      }}
    }
  },
  watch: {
    'formData.OTData.openFlexYn': {
      handler: function(v) {
        this.convertDateValue()
      }
    }
  },
  mounted: function() {
    this.initializeData()
    this.convertDateValue()
  },
  methods: {
    handlePickerChange(val) {
      this.convertDateValue()
    },
    initializeData(){
      this.formData = this.masterData

      this.formData.OTData.openFlexTime.prefixdTime = !this.formData.OTData.openFlexTime.prefixdTime ? [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] : this.formData.OTData.openFlexTime.prefixdTime
      this.formData.OTData.daysOT.forEach((o, idx, self) => {
        o.prefixdTime = o.prefixdTime.length <= 0 ? 
        o.seq == 6 ? [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] : [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] 
        : 
        o.prefixdTime
      })

      const data = {
        openFlexYn: false,
        openFlexTime: { itemName: 'OT', seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] },
        daysOT: [
          { openStat: true, itemName: 'OT', seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', seq: 2, itemValue: '화', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', seq: 3, itemValue: '수', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', seq: 4, itemValue: '목', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', seq: 5, itemValue: '금', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', seq: 6, itemValue: '토', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] },
          { openStat: false, itemName: 'OT', seq: 7, itemValue: '일', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] }
        ]
      }
    },
    convertDateValue() {
      var tmpTimeValue
      this.formData.OTData.daysOT.forEach(obj => {
        tmpTimeValue = ''
        if (obj.openStat) {
          obj.prefixdTime.forEach(time => {
            tmpTimeValue += parseTime(time, '{h}.{i}') + ','
          })
        } else {
          tmpTimeValue = '0,'
        }
        obj.itemProperty = tmpTimeValue.substr(0, tmpTimeValue.length - 1)

        if (this.formData.OTData.openFlexYn) {
          if (obj.seq == 6 || obj.seq == 7) {
            obj.itemProperty = 0
            obj.openStat = false
          }
        } else {
          if (obj.seq == 6) {
            obj.openStat = true
          }
        }
      })
    },
    // handleClickConfirm() {
    //   this.$emit('setOTData', this.formData)
    //   this.$emit('toggleInnerDialog')
    // },
    setOperationStat(item) {
      this.convertDateValue()
    }
  }
}
</script>
<style scoped>
.day-row {
  border-bottom: 1px solid gray;
  margin: 13px;
  padding: 13px;
  height: 90px;
}
.day-text {
    font-size: 120%;
    color: orangered;
    margin-right: 30px;
}
.flex-stat-text {
    font-size: 120%;
    color: indigo;
    margin-right: 30px;
}
</style>
