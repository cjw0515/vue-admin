<template>
  <el-dialog
    v-if="innerFormName != ''"
    :width="formWidth"
    :title="formTitle"
    :visible.sync="innerVisible"
    :destroy-on-close="true"
    :before-close="handleClickClose"
    append-to-body
  >
    <div :is="component" ref="form" :master-data="formMasterData" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClickClose">Cancel</el-button>
      <el-button type="primary" @click="handleClickConfirm()">Confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { parseTime } from '@/utils/index'
import OTForm from './forms/OTForm'
import TGForm from './forms/TGForm'
import SJForm from './forms/SJForm'

export default {
  components: { OTForm, TGForm, SJForm },
  props: {
    innerVisible: {
      type: Boolean,
      default: false
    },
    instiId: {
      type: Number,
      default: 0
    },
    innerFormName: {
      type: String,
      default: ''
    },
    formData: {
      type: [Array, Object]
    }
  },
  data: () => ({
    formComponents: {
      'OTForm': { component: OTForm, name: '운영 시간', width: '40%', dataKey: 'OTData' },
      'TGForm': { component: TGForm, name: '대상 학년', width: '40%', dataKey: 'TGData' },
      'SJForm': { component: SJForm, name: '개설 과목', width: '60%', dataKey: 'SJData' }
    }
  }),
  computed: {
    component: function() {
      return this.formComponents[this.innerFormName].component
    },
    formTitle: function() {
      return this.formComponents[this.innerFormName].name
    },
    formWidth: function() {
      return this.formComponents[this.innerFormName].width
    },
    formDataKey: function(){
      return this.formComponents[this.innerFormName].dataKey
    },
    formMasterData: function(){
      const tmpData = JSON.parse(JSON.stringify(this.formData[this.formComponents[this.innerFormName].dataKey])) 
      return {[this.formComponents[this.innerFormName].dataKey]: tmpData }
    }
  },
  methods: {
    handleClickClose() {
      this.$emit('toggleInnerDialog')
    },
    handleClickConfirm() {
      this.$emit('setFormData', this.formDataKey,  this.$refs['form'].formData[this.formDataKey])
      this.$emit('toggleInnerDialog')
    }
  }
}
</script>
<style scoped>
</style>
