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
		:model="formData"
		:rules="rules"
    :label-position="labelPosition"
    :inline="true"
		ref="menuForm">

        <el-row>
          <el-form-item label="최상위 여부" :label-width="formDialogData.formLabelWidth">
            <el-switch
            v-model="isTopLevelMenu"
            active-text="하위메뉴"
            inactive-text="최상위메뉴"
            />
          </el-form-item>
        </el-row>

      <el-row v-if="isTopLevelMenu">
        <el-form-item label="상위 메뉴 선택" :label-width="formDialogData.formLabelWidth">
          <el-tree
          :data="tableData"
          node-key="id"
          highlight-current
          :expand-on-click-node="false">
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
            <el-input v-model="formData.title" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="path" label="경로" :label-width="formDialogData.formLabelWidth">
            <el-input v-model="formData.path" autocomplete="off" />
          </el-form-item>
        </el-col>        
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item prop="redirect" label="리다이렉트 경로" :label-width="formDialogData.formLabelWidth">
            <el-input v-model="formData.path" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="캐시 여부" prop="noCache" :label-width="formDialogData.formLabelWidth">
            <el-switch
            v-model="formData.noCache"
            active-text="사용"
            inactive-text="사용안함"
            />
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
            <el-switch
            v-model="formData.affix"
            active-text="사용"
            inactive-text="사용안함"
            />
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
          <el-form-item label="히스토리 사용 여부" prop="breadcrumb" :label-width="formDialogData.formLabelWidth">
            <el-switch
            v-model="formData.breadcrumb"
            active-text="사용"
            inactive-text="사용안함"
            />
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
import { getAAcademy, updateAcademy } from '@/api/insti/academy'

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
      labelPosition: "left",
      isTopLevelMenu: false,
		top: "top",
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formData: {
        parentId: 0,
        name: "TodoList",
        path: "/todolist",
        redirect: false,
        regUser: "",
        status: true,
        roles: "admin",
        title: "todolist",
        icon: "list",
        noCache: false,
        affix: false,
        breadcrumb: false
      },
      rules: {
        // age: [
        //   { required: true, message: '나이를 기입해주세요.',trigger: 'blur' },
        //   { type: 'number', message: '나이는 숫자여야만 합니다.' }
        // ],
        instiName: [{ required: true, message: '기입해 주세요.' }],
        // instiKname: [{ required: true, message: '기입해 주세요.' }],
        // address1: [{ required: true, message: '기입해 주세요.' }],
        // address3: [{ required: true, message: '기입해 주세요.' }],
        // building: [{ required: true, message: '기입해 주세요.' }],
        // zipcode: [{ required: true, message: '기입해 주세요.' }],
        // oldAddress: [{ required: true, message: '기입해 주세요.' }],
        // oldZipcode: [{ required: true, message: '기입해 주세요.' }],
        latitude: [{ required: true, message: '기입해 주세요.' }],
        longitude: [{ required: true, message: '기입해 주세요.' }],
        // confirmYn: [{ required: true, message: '기입해 주세요.' }],
        itemName: [{ required: true, message: '기입해 주세요.' }],
        itemValue: [{ required: true, message: '기입해 주세요.' }]
      },
    }
  },
  methods: {
    handleClickConfirm() {
      // this.$refs['academyForm'].validate(valid => {
      //   if (valid) {
      //     updateAcademy(this.formData).then(() => {
      //       this.$message({
      //         message: '수정되었습니다!',
      //         type: 'success'
      //       })
      //       this.$emit('toggleDialog')
      //       this.resetForm()
      //     })
      //   }
      // })
    },
    handleClickClose() {
      this.$emit('toggleDialog')
	},
	handleClickMenuNode(node, data){
		this.formData.parentId = data.meta.parentId
		console.log(data)
	}
  }
}
</script>
<style>
</style>
