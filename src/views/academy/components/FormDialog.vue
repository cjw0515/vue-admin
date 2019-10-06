<template>
  <div>
    <!-- 다이얼로그 -->
    <el-dialog
      :title="formDialogData.textMap[formDialogData.dialogStatus]"
      :visible="formDialogData.formDialogVisible"
      :before-close="handleClickClose"
      :width="formDialogData.width"
    >
      <el-form
        ref="ageInertForm"
        :model="formData"
        :rules="rules"
        :label-position="formDialogData.labelPosition"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="공식이름" prop="age">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="한글 이름" prop="age">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="주소(도로명)" prop="age">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="주소(지번)" prop="age">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
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
    formDialogData: {
      type: Object,
      default: function() {
        return {
          dialogStatus: 'create',
          formDialogVisible: false,
          textMap: {
            update: '수정',
            create: '추가'
          },
          width: '70%',
          formLabelWidth: '120px',
          labelPosition: 'top',
          idx: 0
        }
      }
    }
  },
  data() {
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
        gbn: [
          {
            required: true,
            message: '분류코드를 선택해 주세요.',
            trigger: 'blur'
          }
        ],
        age: [
          { required: true, message: '나이를 기입해주세요.' },
          { type: 'number', message: '나이는 숫자여야만 합니다.' }
        ],
        ageName: [
          { required: true, message: '명칭을 적어주세요.', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClickConfirm() {
      this.$refs['ageInertForm'].validate(valid => {
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
