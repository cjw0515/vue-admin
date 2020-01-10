<template>
    <el-dialog
        width="40%"
        title="운영 시간"
        :visible.sync="innerVisible"
        :destroy-on-close="true"
        :before-close="handleClickClose"
        append-to-body>
        <div class="day-row">
            <span class="flex-stat-text"><b>동일 시간</b></span>
            <el-switch
                v-model="formData.openFlexYn"
                active-text="예"
                inactive-text="아니오"
            />
            <el-time-picker
                is-range
                :disabled="!formData.openFlexYn"
                v-model="formData.openFlexTime.prefixdTime"
                format="HH:mm"
                range-separator="~"
                start-placeholder="시작시간"
                end-placeholder="종료시간">
            </el-time-picker>
        </div>
        <div v-for="(item, idx) in formData.daysOT" :key="idx" class="day-row">
            <span class="day-text"><b>{{ item.itemValue }}</b></span>
            <el-switch
                v-model="item.openStat"
                active-text="운영"
                inactive-text="미운영"
                @change="setOperationStat(item)"
            />
            <el-time-picker
                v-if="!formData.openFlexYn"
                is-range
                :disabled="!item.openStat"
                v-model="item.prefixdTime"
                @change="handlePickerChange"
                format="HH:mm"
                range-separator="~"
                start-placeholder="시작시간"
                end-placeholder="종료시간">
            </el-time-picker>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClickClose">Cancel</el-button>
            <el-button type="primary" @click="handleClickConfirm()">Confirm</el-button>
        </span>        
    </el-dialog>
</template>
<script>
import { parseTime } from '@/utils/index'

export default {
    data: () => ({
        formData: {
            openFlexYn: false,
            openFlexTime: { itemName: 'OT', seq: 1, itemValue: '월', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] },
            daysOT: [
                { openStat: true, itemName: 'OT', seq: 1, itemValue: '월', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
                { openStat: true, itemName: 'OT', seq: 2, itemValue: '화', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
                { openStat: true, itemName: 'OT', seq: 3, itemValue: '수', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
                { openStat: true, itemName: 'OT', seq: 4, itemValue: '목', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
                { openStat: true, itemName: 'OT', seq: 5, itemValue: '금', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
                { openStat: true, itemName: 'OT', seq: 6, itemValue: '토', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] },
                { openStat: false, itemName: 'OT', seq: 7, itemValue: '일', itemProperty: "", prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
            ]
        }
    }),
    props: {
        innerVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClickClose(){
            this.$emit('toggleInnerDialog')
        },
        handlePickerChange(val){
            this.convertDateValue()
        },
        convertDateValue(){
            var tmpTimeValue
            this.formData.daysOT.forEach(obj => {
                tmpTimeValue = ""
                if (obj.openStat) {
                    obj.prefixdTime.forEach(time => {
                        tmpTimeValue += parseTime(time, '{h}.{i}') + ','
                    });
                }else{
                    tmpTimeValue = "0,"
                }
                obj.itemProperty = tmpTimeValue.substr(0, tmpTimeValue.length - 1)

                if (this.formData.openFlexYn){
                    if(obj.seq == 6 || obj.seq == 7){
                        obj.itemProperty = 0
                        obj.openStat = false
                    }
                }else{
                    if(obj.seq == 6){
                        obj.openStat = true
                    }
                }
            });
        },
        handleClickConfirm(){
            this.$emit('setOTData', this.formData)
            this.$emit('toggleInnerDialog')
        },
        setOperationStat(item){
            this.convertDateValue()
        }
    },
    mounted: function(){
        this.convertDateValue()
    },
    watch: {
        "formData.openFlexYn": {
            handler: function(v){
                this.convertDateValue()
            }
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