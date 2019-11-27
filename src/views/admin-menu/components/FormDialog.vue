<template>
  <div>
    <!-- 다이얼로그 -->
    <el-dialog
      :title="formDialogData.textMap[formDialogData.dialogStatus]"
      :visible="formDialogData.formDialogVisible"
      :before-close="handleClickClose"
      :width="formDialogData.width"
    >
      <!-- <el-form
        ref="menuForm"
        :model="formData"
        :label-position="formDialogData.labelPosition"
        :rules="rules"
      >
      </el-form> -->
		<el-form 
		:model="ruleForm" 
		:rules="rules" 
		ref="ruleForm" label-width="120px" class="demo-ruleForm">
			<el-form-item label="최상위 여부" prop="delivery" :label-position="top">
				<el-switch 
				v-model="ruleForm.delivery"
				active-text="최상위메뉴"
				inactive-text="하위메뉴"
				/>
			</el-form-item>			
			<el-form-item label="메뉴선택">
				<el-tree
				:data="tableData"
				node-key="id"
				highlight-current
				:expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span
						@click="handleClickMenuNode(node, data)"
						>{{ data.meta.title }}</span>
					</span>
				</el-tree>
			</el-form-item>			
			<el-form-item label="상위메뉴" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="Activity zone" prop="region">
				<el-select v-model="ruleForm.region" placeholder="Activity zone">
				<el-option label="Zone one" value="shanghai"></el-option>
				<el-option label="Zone two" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="Activity time" required>
				<el-col :span="11">
				<el-form-item prop="date1">
					<el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				</el-form-item>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
				<el-form-item prop="date2">
					<el-time-picker placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
				</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="Instant delivery" prop="delivery">
				<el-switch v-model="ruleForm.delivery"></el-switch>
			</el-form-item>
			<el-form-item label="Activity type" prop="type">
				<el-checkbox-group v-model="ruleForm.type">
				<el-checkbox label="Online activities" name="type"></el-checkbox>
				<el-checkbox label="Promotion activities" name="type"></el-checkbox>
				<el-checkbox label="Offline activities" name="type"></el-checkbox>
				<el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="Resources" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
				<el-radio label="Sponsorship"></el-radio>
				<el-radio label="Venue"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="Activity form" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
				<el-button @click="resetForm('ruleForm')">Reset</el-button>
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
          labelPosition: 'top',
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

  //     "parentId": 0,
  //     "name": "TodoList",
  //     "path": "/todolist",
  //     "redirect": false,
  //     "regUser": "",
  //     "status": true,
  //     "meta": {
  //       "roles": "admin",
  //       "title": "todolist",
  //       "icon": "list",
  //       "noCache": false,
  //       "affix": false,
  //       "breadcrumb": false
  //     },

    return {
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
        instiName: '',
        instiKname: '',
        address1: '',
        address3: '',
        building: '',
        zipcode: '',
        oldAddress: '',
        oldZipcode: '',
        latitude: '',
        longitude: '',
        updId: '',
        confirmYn: '',
        itemName: '',
        itemValue: '',
        phonNum1: 0,
        phonNum2: 0,
        phonNum3: 0
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
		this.ruleForm.name = data.meta.title
		console.log(data)
	}
  }
}
</script>
<style>
</style>
