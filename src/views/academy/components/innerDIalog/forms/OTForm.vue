<template>
  <div>
    <div class="day-row">
      <span class="flex-stat-text"><b>동일 시간</b></span>
      <el-switch
        v-model="formData.OTData.openFlexYn"
        active-text="예"
        inactive-text="아니오"
        :active-value="trueVal"
        :inactive-value="falseVal"
        @change="setOperationStat()"
      />
      <el-time-picker
        v-model="formData.OTData.openFlexTime.prefixdTime"
        is-range
        :disabled="!formData.OTData.openFlexYn"
        format="HH:mm"
        range-separator="~"
        start-placeholder="시작시간"
        end-placeholder="종료시간"
        @change="handlePickerChange"
      />
    </div>
    <!-- 요일별 시간 -->
    <div v-for="(item, idx) in formData.OTData.daysOT" :key="idx" class="day-row">
      <span class="day-text"><b>{{ item.itemValue }}</b></span>
      <el-switch
        v-model="item.openStat"
        active-text="운영"
        inactive-text="미운영"
        @change="setOperationStat()"
      />
      <el-time-picker
        v-if="!formData.OTData.openFlexYn || !(item.seq != 6 && item.seq != 7)"
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
  data: function() {
    return {
      formData: {
        OTData: {
          openFlexYn: 0,
          openFlexTime: { itemName: 'OT', useYn: true, seq: 8, itemValue: '동일시간', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] },
          daysOT: [
            { openStat: true, itemName: 'OT', useYn: true, seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', useYn: true, seq: 2, itemValue: '화', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', useYn: true, seq: 3, itemValue: '수', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', useYn: true, seq: 4, itemValue: '목', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', useYn: true, seq: 5, itemValue: '금', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            { openStat: true, itemName: 'OT', useYn: true, seq: 6, itemValue: '토', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] },
            { openStat: false, itemName: 'OT', useYn: true, seq: 7, itemValue: '일', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] }
          ]
        }},
      trueVal: 1,
      falseVal: 0
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
    sendAdditionalInstiData() {
      // return {}
      return {
        insti: {
          openFlexYn: this.formData.OTData.openFlexYn
        }}
    },
    initializeData() {
      this.formData = this.masterData

      this.formData.OTData.openFlexTime.prefixdTime = !this.formData.OTData.openFlexTime.prefixdTime ? [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] : this.formData.OTData.openFlexTime.prefixdTime
      this.formData.OTData.daysOT.forEach((o, idx, self) => {
        o.prefixdTime = o.prefixdTime.length <= 0
          ? o.seq == 6 ? [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] : [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)]
          : o.prefixdTime
      })
    },
    convertDateValue() {
      let tmpTimeValue
      // flex time
      tmpTimeValue = ''
      this.formData.OTData.openFlexTime.prefixdTime.forEach(time => {
        tmpTimeValue += parseTime(time, '{h}.{i}') + ','
      })
      this.formData.OTData.openFlexTime.itemProperty = tmpTimeValue.substr(0, tmpTimeValue.length - 1)

      this.formData.OTData.daysOT.forEach(obj => {
        tmpTimeValue = ''
        // itemProperty 셋팅
        if (obj.openStat) {
          if (this.formData.OTData.openFlexYn && !(obj.seq == 6 || obj.seq == 7)) obj.prefixdTime = this.formData.OTData.openFlexTime.prefixdTime
          obj.prefixdTime.forEach(time => {
            tmpTimeValue += parseTime(time, '{h}.{i}') + ','
          })
        } else {
          tmpTimeValue = '0,'
        }
        obj.itemProperty = tmpTimeValue.substr(0, tmpTimeValue.length - 1)
      })
    },
    setOperationStat() {
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
