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
    <div :is="component" ref="form" :master-data="formMasterData" :dialog-status="dialogStatus" />
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
import { updateAcademy } from '@/api/insti/academy'
import { generateInstiData, dataDivider } from '@/utils/insti/'

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
    },
    dialogStatus: {
      type: String
    }
  },
  data: () => ({
    formComponents: {
      'OTForm': { component: OTForm, name: '운영 시간', width: '40%', dataKey: 'OTData' },
      'TGForm': { component: TGForm, name: '대상 학년', width: '40%', dataKey: 'TGData' },
      'SJForm': { component: SJForm, name: '개설 과목 / 대표과목', width: '60%', dataKey: 'SJData' }
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
    formDataKey: function() {
      return this.formComponents[this.innerFormName].dataKey
    },
    formMasterData: function() {
      const tmpData = JSON.parse(JSON.stringify(this.formData[this.formComponents[this.innerFormName].dataKey]))
      return { [this.formComponents[this.innerFormName].dataKey]: tmpData }
    }
  },
  methods: {
    handleClickClose() {
      this.$emit('toggleInnerDialog')
    },
    handleClickConfirm() {
      const data = this.$refs['form'].formData[this.formDataKey]

      this.updateInnerDialogData(this.instiId, data).then(({ status }) => {
        if(status === "success")
        this.$message({
          message: '수정되었습니다!',
          type: 'success'
        })
        this.$emit('setFormData', this.formDataKey, JSON.parse(JSON.stringify(data)))
        this.$emit('toggleInnerDialog')
      })
    },
    async updateInnerDialogData(instiId, data, additionInstiData) {
      const detailData = generateInstiData(data, ['gbn', 'codeNo', 'useYn'])
      const additionData = generateInstiData(data, ['itemName', 'seq', 'itemValue', 'itemProperty', 'useYn'])
      const payload = {
        detailData: detailData,
        additionData: additionData,
        ...this.$refs['form'].sendAdditionalInstiData()
      }
      const rest = await updateAcademy(instiId, payload)
      console.log(rest)
      return rest
    }
  }
}
</script>
<style scoped>
</style>
