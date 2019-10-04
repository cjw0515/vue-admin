<template>
  <div>
    <!-- 다이얼로그 -->
    <el-dialog title="연령 코드 추가" :visible="formDialogVisible" :before-close="handleClickClose">
      <el-form ref="ageInertForm" :model="formData" :rules="rules">
        <el-form-item label="나이" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="formData.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="분류코드" :label-width="formLabelWidth" prop="gbn">
          <el-select
            v-model="formData.gbn"
            placeholder="분류코드/코드명"
            clearable
            style="width: 180px"
            class="filter-item"
          >
            <el-option v-for="item in codeTypesOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="명칭" :label-width="formLabelWidth" prop="ageName">
          <el-input v-model="formData.ageName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickClose">Cancel</el-button>
        <el-button type="primary" @click="handleClickConfirm()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addCodeAge } from '@/api/insti/age-code'

export default {
  props: {
    formDialogVisible: {
      type: Boolean,
      default: false
    },
    formLabelWidth: {
      type: String,
      default: '120px'
    }
  },
  data: function() {
    return {
      formData: {
        age: '',
        gbn: '',
        ageName: ''
      },
      codeTypesOptions: [
        { label: '별칭(A)', value: 'A' },
        { label: '그룹(C)', value: 'C' },
        { label: '공식명칭(O)', value: 'O' }
      ],
      rules: {
        gbn: [{ required: true, message: '분류코드를 선택해 주세요.', trigger: 'blur' }],
        age: [
          { required: true, message: '나이를 기입해주세요.' },
          { type: 'number', message: '나이는 숫자여야만 합니다.' }
        ],
        ageName: [{ required: true, message: '명칭을 적어주세요.', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClickConfirm() {
      this.$refs['ageInertForm'].validate((valid) => {
        if (valid) {
          addCodeAge(this.formData).then(() => {
            this.$message({
              message: '등록되었습니다!',
              type: 'success'
            })
            this.$emit('toggleDialog')
            this.resetForm()
          })
        }
      })
    },
    handleClickClose() {
      this.$emit('toggleDialog')
    },
    resetForm() {
      this.formData = {
        age: '',
        gbn: '',
        ageName: ''
      }
    }
  }
}
</script>
<style>

</style>
