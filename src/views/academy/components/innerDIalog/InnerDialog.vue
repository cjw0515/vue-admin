<template>
  <el-dialog
    v-if="innerFormName != ''"
    width="40%"
    :title="formTitle"
    :visible.sync="innerVisible"
    :destroy-on-close="true"
    :before-close="handleClickClose"
    append-to-body
  >
    <div :is="component" />
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
    }
  },
  data: () => ({
    formComponents: {
      'OTForm': { component: OTForm, name: '운영 시간' },
      'TGForm': { component: TGForm, name: '대상 학년' },
      'SJForm': { component: SJForm, name: '개설 과목' }
    }
  }),
  computed: {
    component: function() {
      return this.formComponents[this.innerFormName].component
    },
    formTitle: function() {
      return this.formComponents[this.innerFormName].name
    }
  },
  methods: {
    handleClickClose() {
      this.$emit('toggleInnerDialog')
    },
    handleClickConfirm() {
      // this.$emit('setOTData', this.formData)
      // this.$emit('toggleInnerDialog')
    }
  }
}
</script>
<style scoped>
</style>
