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
        ref="menuForm"
        :model="formData"
        :rules="rules"
        :label-position="labelPosition"
        :inline="true"
      >

        <el-row>
          <el-col :span="10">
            <el-form-item label="최상위 여부" :label-width="formDialogData.formLabelWidth">
              <el-switch
                v-model="isTopLevelMenu"
                active-text="하위메뉴"
                inactive-text="최상위메뉴"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="name" label="라우터 명" :label-width="formDialogData.formLabelWidth">
              <el-tooltip content="뷰 라우터 이름입니다." placement="top">
                <el-input v-model="formData.name" autocomplete="off" />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isTopLevelMenu">
          <el-form-item label="상위 메뉴 선택" :label-width="formDialogData.formLabelWidth">
            <el-tree
              :data="tableData"
              node-key="id"
              highlight-current
              :expand-on-click-node="false"
            >
              <span slot-scope="{ node, data }">
                <span
                  @click="handleClickMenuNode(node, data)"
                >{{ data.meta.title }}</span>
              </span>
            </el-tree>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item prop="title" label="메뉴 명" :label-width="formDialogData.formLabelWidth">
              <el-tooltip content="프론트에 노출되는 메뉴 이름입니다." placement="top">
                <el-input v-model="formData.title" autocomplete="off" />
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="path" label="경로" :label-width="formDialogData.formLabelWidth">
              <el-tooltip content="메뉴의 경로입니다." placement="top">
                <el-input v-model="formData.path" autocomplete="off" />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item prop="redirect" label="리다이렉트 경로" :label-width="formDialogData.formLabelWidth">
              <el-tooltip content="히스토리 태그에서 클릭 시 리다이렉트 되는 경로입니다." placement="top">
                <el-input v-model="formData.redirect" autocomplete="off" />
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="캐시 여부" prop="noCache" :label-width="formDialogData.formLabelWidth">
              <el-tooltip content="사용 시, 페이지가 캐싱되지 않습니다." placement="right">
                <el-switch
                  v-model="formData.noCache"
                  active-text="사용"
                  inactive-text="사용안함"
                />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item prop="roles" label="권한" :label-width="formDialogData.formLabelWidth">
              <el-input v-model="formData.roles" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="히스토리fix 여부" prop="affix" :label-width="formDialogData.formLabelWidth">
              <el-tooltip content="사용 시 히스토리 태그에 고정됩니다." placement="right">
                <el-switch
                  v-model="formData.affix"
                  active-text="사용"
                  inactive-text="사용안함"
                />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item prop="icon" label="아이콘" :label-width="formDialogData.formLabelWidth">
              <el-input v-model="formData.icon" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-tooltip content="사용 안함으로 설정 시 히스토리 태그에서 보이지 않습니다." placement="right">
              <el-form-item label="히스토리 사용 여부" prop="breadcrumb" :label-width="formDialogData.formLabelWidth">
                <el-switch
                  v-model="formData.breadcrumb"
                  active-text="사용"
                  inactive-text="사용안함"
                />
              </el-form-item>
            </el-tooltip>
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
import { getAmenu, addMenu } from '@/api/admin/admin-menu'
import store from '@/store/'

export default {
  props: {
    formDialogData: {
      type: Object,
      default: function() {
        return {
          dialogStatus: 'update',
          formDialogVisible: false,
          textMap: {
            update: '수정',
            create: '추가'
          },
          width: '70%',
          formLabelWidth: '120px',
          labelPosition: 'left',
          idx: 0
        }
      }
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      labelPosition: 'left',
      isTopLevelMenu: false,
		  top: 'top',
      formData: {
        parentId: 0,
        name: '',
        path: '',
        redirect: '',
        regUser: store.getters.name,
        status: true,
        roles: '',
        title: '',
        icon: '',
        noCache: false,
        affix: false,
        breadcrumb: false
      },
      rules: {
        name: [{ required: true, message: '필수 항목입니다.' }],
        path: [{ required: true, message: '필수 항목입니다.' }],
        roles: [{ required: true, message: '필수 항목입니다.' }],
        title: [{ required: true, message: '필수 항목입니다.' }]
      }
    }
  },
  mounted: function() {
    console.log(store.getters.name)
  },
  methods: {
    handleClickConfirm() {
      this.$refs['menuForm'].validate(valid => {
        if (valid) {
          addMenu(this.formData).then(() => {
            this.$message({
              message: this.formDialogData.dialogStatus == 'create' ? '메뉴가 추가되었습니다!' : '메뉴가 수정되었습니다!',
              type: 'success'
            })
            this.$emit('toggleDialog')
            this.$emit('getData')
            this.$refs['menuForm'].resetFields()
          })
        }
      })
    },
    handleClickClose() {
      this.$emit('toggleDialog')
    },
    handleClickMenuNode(node, data) {
      console.log(data.id)
      this.formData.parentId = data.id
      console.log(data.parentId)
    }
  }
}
</script>
<style>
</style>
