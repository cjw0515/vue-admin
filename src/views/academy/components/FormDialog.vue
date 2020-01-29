<template>
  <div>
    <!-- 다이얼로그 -->
    <el-dialog
      :title="formDialogData.textMap[formDialogData.dialogStatus]"
      :visible="formDialogData.formDialogVisible"
      :before-close="handleClickClose"
      :width="formDialogData.width"
      :destroy-on-close="true"
    >
      <el-form
        ref="academyForm"
        :model="formData"
        :label-position="formDialogData.labelPosition"
        :rules="rules"
      >
        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-name">일반</span>
          </div>
          <div>
            <el-row>
              <div class="sub-title"><span>이름</span></div>
              <el-col :span="12">
                <el-form-item label="공식이름" prop="instiName">
                  <el-input v-model.number="formData.instiName" style="padding: 5px;width: 70%" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="한글 이름" prop="instiKname">
                  <el-input v-model.number="formData.instiKname" style="padding: 5px;width: 70%" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <div class="sub-title"><span>주소(도로명)</span></div>
                <el-form-item prop="address1" label="주소" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.address1" style="width:80%" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="sub-title"><span>주소(지번)</span></div>
                <el-form-item prop="oldAddress" label="주소" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.oldAddress" style="width:80%" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item prop="building" label="빌딩" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.building" style="width:80%" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="address3" label="동" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.address3" style="width:80%" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item prop="zipcode" label="우편번호" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.zipcode" style="width:80%" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="oldZipcode" label="우편번호" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.oldZipcode" style="width:80%" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item prop="phonNum1" label="전화번호" :label-width="formDialogData.formLabelWidth">
                  <el-input v-model.number="formData.phonNum1" autocomplete="off" style="width:80%" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item prop="phonNum2">
                  <el-input v-model.number="formData.phonNum2" autocomplete="off" style="width:80%" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item prop="phonNum3">
                  <el-input v-model.number="formData.phonNum3" autocomplete="off" style="width:80%" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <div class="sub-title"><span>지리정보</span></div>
                <el-container>
                  <el-aside>
                    <el-form-item prop="latitude" label="위도">
                      <el-input v-model.number="formData.latitude" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="longitude" label="경도">
                      <el-input v-model.number="formData.longitude" autocomplete="off" />
                    </el-form-item>
                  </el-aside>
                  <el-container>
                    <el-main>
                      <vue-daum-map
                        :app-key="mapAPIKey"
                        :center.sync="center"
                        :level.sync="level"
                        :map-type-id="mapTypeId"
                        :libraries="libraries"
                        style="width:800px;height:400px;"
                        @load="onLoad"
                        @click="handleClickMap"
                      />
                    </el-main>
                  </el-container>
                </el-container>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <div class="sub-title"><span>확인여부</span></div>
                <el-form-item prop="confirmYn">
                  <el-switch
                    v-model="formData.confirmYn"
                    active-value="1"
                    inactive-value="0"
                    active-text="확인"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-name">운영</span>
          </div>
          <div>

            <el-row>
              <div class="sub-title"><span>운영 시간</span><svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('OTForm')" /></div>
              <el-col :span="24">
                <el-table
                  :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                  border
                  :data="dispOT"
                  style="width: 100%"
                >
                  <el-table-column
                    v-for="dayObj in formData.OTData.daysOT"
                    :key="dayObj.seq"
                    :label="dayObj.itemValue"
                  >
                    <template #default="{ row }">
                      <div>{{ row[dayObj.seq] }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title"><span>대상 학년</span><svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('TGForm')" /></div>
              <el-col :span="24">
                <el-table
                  :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                  border
                  :data="dispTG.data"
                  style="width: 100%"
                >
                  <el-table-column
                    v-for="obj in dispTG.col"
                    :key="obj.codeNo"
                    :label="obj.disp"
                  >
                    <template #default="{ row }">
                      <div>{{ row[obj.codeNo] ? 'O' : 'X' }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title"><span>주 대상</span><svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('TGForm')" /></div>
              <el-col :span="24">
                <el-table
                  :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                  border
                  :data="dispTG.data"
                  style="width: 100%"
                >
                  <el-table-column
                    v-for="obj in dispMainTG.col"
                    :key="obj.seq"
                    :label="obj.itemValue"
                  >
                    <template #default="{ row }">
                      <div>{{ row[obj.seq] == 1 ? 'O' : 'X' }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title"><span /></div>
              <el-row>
                <el-col :span="6">
                  <el-form-item prop="entranExamYn" label="입학테스트 여부">
                    <el-select v-model="formData.entranExamYn" placeholder="Select">
                      <el-option
                        v-for="item in entrExmOptions"
                        :key="item.value"
                        :label="item.disp"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="numLimit" label="정원" :label-width="formDialogData.formLabelWidth">
                    <el-input v-model.number="formData.numLimit" style="width:80%" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="homeworkAmount" label="숙제량">
                    <el-select v-model="formData.homeworkAmount" placeholder="Select">
                      <el-option
                        v-for="item in homworkOptions"
                        :key="item.value"
                        :label="item.disp"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>

          </div>
        </el-card>

        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-name">과목</span>
          </div>
          <div>

            <el-row>
              <div class="sub-title"><span>대표과목</span><svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('SJForm')" /></div>
              <el-col v-for="(value, key, idx) in formData.SJData" :key="idx" :span="4">
                <el-table
                  :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                  border
                  :data="value.list"
                  style="width: 100%"
                >
                  <el-table-column :label="value.label" prop="disp" />
                </el-table>
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickClose">Cancel</el-button>
        <el-button type="primary" @click="handleClickConfirm()">Confirm</el-button>
      </span>
      <InnerDialog
        :inner-visible.sync="innerVisible"
        :insti-id="formDialogData.idx"
        :inner-form-name="innerFormName"
        :form-data="formData"
        @toggleInnerDialog="toggleInnerDialog()"
        @setFormData="setFormData"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getAAcademy, updateAcademy } from '@/api/insti/academy'
import VueDaumMap from '@/components/DaumMap'
import InnerDialog from './innerDIalog/InnerDialog'
import { createUniqueString, parseTime } from '@/utils/index'

export default {
  components: { VueDaumMap, InnerDialog },
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
    }
  },
  data() {
    return {
      innerVisible: false,
      innerFormName: '',
      formData: {
        // 일반
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
        phonNum3: 0,
        entranExamYn: false,
        homeworkAmount: 1,
        numLimit: 0,
        // 운영
        OTData: {
          openFlexYn: false,
          openFlexTime: { itemName: 'OT', seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] },
          daysOT: [
            { openStat: true, itemName: 'OT', seq: 1, itemValue: '월', itemProperty: '', prefixdTime: '' },
            { openStat: true, itemName: 'OT', seq: 2, itemValue: '화', itemProperty: '', prefixdTime: '' },
            { openStat: true, itemName: 'OT', seq: 3, itemValue: '수', itemProperty: '', prefixdTime: '' },
            { openStat: true, itemName: 'OT', seq: 4, itemValue: '목', itemProperty: '', prefixdTime: '' },
            { openStat: true, itemName: 'OT', seq: 5, itemValue: '금', itemProperty: '', prefixdTime: '' },
            { openStat: true, itemName: 'OT', seq: 6, itemValue: '토', itemProperty: '', prefixdTime: '' },
            { openStat: false, itemName: 'OT', seq: 7, itemValue: '일', itemProperty: '', prefixdTime: '' }
          ]
        },
        TGData: {
          TGData: [
            { itemName: 'TG', seq: 1, itemValue: '유치원', itemProperty: '0', targetLevels: [{ gdn: 'AG', codeNo: 7, useYn: false, disp: '유치원' }] },
            { itemName: 'TG', seq: 2, itemValue: '초등', itemProperty: '0',
              targetLevels: [
                { gdn: 'AG', codeNo: 8, useYn: false, disp: '초1' },
                { gdn: 'AG', codeNo: 9, useYn: false, disp: '초2' },
                { gdn: 'AG', codeNo: 10, useYn: false, disp: '초3' },
                { gdn: 'AG', codeNo: 11, useYn: false, disp: '초4' },
                { gdn: 'AG', codeNo: 12, useYn: false, disp: '초5' },
                { gdn: 'AG', codeNo: 13, useYn: false, disp: '초6' }
              ]
            },
            { itemName: 'TG', seq: 3, itemValue: '중등', itemProperty: '0',
              targetLevels: [
                { gdn: 'AG', codeNo: 14, useYn: false, disp: '중1' },
                { gdn: 'AG', codeNo: 15, useYn: false, disp: '중2' },
                { gdn: 'AG', codeNo: 16, useYn: false, disp: '중3' }
              ]
            },
            { itemName: 'TG', seq: 4, itemValue: '고등', itemProperty: '0',
              targetLevels: [
                { gdn: 'AG', codeNo: 17, useYn: false, disp: '고1' },
                { gdn: 'AG', codeNo: 18, useYn: false, disp: '고2' },
                { gdn: 'AG', codeNo: 19, useYn: false, disp: '고3' }
              ]
            },
            { itemName: 'TG', seq: 5, itemValue: 'N수', itemProperty: '0', targetLevels: [{ gdn: 'AG', codeNo: 20, useYn: false, disp: 'N수' }] }
          ]
        },
        SJData: {
          OSData: {
            disp: 'OSData', label: '개설 과목',
            list: []
          },
          R1Data: {
            disp: 'R1Data', label: '공통',
            list: []
          },
          R2Data: {
            disp: 'R2Data', label: '초등',
            list: []
          },
          R3Data: {
            disp: 'R3Data', label: '중등',
            list: []
          },
          R4Data: {
            disp: 'R4Data', label: '고등',
            list: []
          },
          R5Data: {
            disp: 'R5Data', label: 'N수',
            list: []
          }
        }
      },
      entrExmOptions: [{ value: false, disp: '아니오' }, { value: true, disp: '예' }],
      homworkOptions: [{ value: 1, disp: '적음' }, { value: 2, disp: '보통' }, { value: 3, disp: '많음' }],
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
      mapAPIKey: 'fa5bbaa22e298e97f79812b9ff7994d0', // 테스트용 appkey
      center: { lat: 33.450701, lng: 126.570667 }, // 지도의 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도),
      mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
      libraries: [], // 추가로 불러올 라이브러리
      map: null, // 지도 객체. 지도가 로드되면 할당됨.
      marker: null
    }
  },
  computed: {
    dispOT: function() {
      const rstObj = {}
      if (!this.formData.OTData) return []
      this.formData.OTData.daysOT.forEach(obj => {
        rstObj[obj.seq] = obj.itemProperty ? parseTime(obj['prefixdTime'][0], '{h}시 {i}분') + ' ~ ' + parseTime(obj['prefixdTime'][1], '{h}시 {i}분') : '-'
      })
      return [rstObj]
    },
    dispTG: function() {
      const tmpArr = []

      this.formData.TGData.TGData.forEach(o => {
        o.targetLevels.forEach(l => {
          tmpArr.push(l)
        })
      })

      const tmpDataObj = {}
      tmpArr.forEach(o => {
        tmpDataObj[o.codeNo] = o.useYn
      })

      return { col: tmpArr, data: [tmpDataObj] }
    },
    dispMainTG: function() {
      let tmpArr = []

      tmpArr = this.formData.TGData.TGData.map(o => o)
      const tmpDataObj = {}
      tmpArr.forEach(o => {
        tmpDataObj[o.seq] = o.itemProperty
      })

      return { col: tmpArr, data: [tmpDataObj] }
    }
  },
  watch: {
    formDialogData: {
      handler() {
        // if (this.formDialogData.idx) {
        //   this.getAAcademy(this.formDialogData.idx)
        // }
      },
      deep: true
    }
  },
  created: function() {
    if (this.formDialogData.idx) {
      this.getAAcademy(this.formDialogData.idx)
    }
  },
  mounted: function() {
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
    selectedFormData(){      
      return this.formData[this.innerFormName]
    },    
    openInnerDialog(formName) {
      this.innerFormName = formName
      this.innerVisible = true
    },
    handleClickClose() {
      this.resetForm()
      this.$emit('toggleDialog')
    },
    toggleInnerDialog() {
      this.innerVisible = !this.innerVisible
    },
    resetForm() {
      this.$refs['academyForm'].resetFields()
    },
    onLoad(map, marker) {
      this.map = map
      this.marker = marker
    },
    handleClickMap(e) {
      const latlng = e[0].latLng
      this.marker.setPosition(latlng)
      this.formData.latitude = latlng.getLat()
      this.formData.longitude = latlng.getLng()
    },
    async getAAcademy(id) {
      const { data } = await getAAcademy(id)

      for (const key in this.formData) {
        if (data[key]) this.formData[key] = data[key]
      }
      this.setCenter({ lat: this.formData.latitude || 33.450701, lng: this.formData.longitude || 126.570667 })
      this.marker.setPosition(new kakao.maps.LatLng(this.formData.latitude, this.formData.longitude))
    },
    setCenter(centerObj) {
      this.center = centerObj
    },
    parsedPhoneNumber(idx) {
      return
    },
    getKey() {
      return createUniqueString()
    },
    setFormData(dataKey, data) {
      this.formData[dataKey] = data
    }
  }
}
</script>
<style scoped>
.line {
  text-align: center;
}
.el-aside {
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
  line-height: 200px;
}
.sub-title {
  line-height: 24px;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
}
.sub-title span {
  color: #1890ff;
}
.box-card {
  border-top: 2px solid red;
  margin-bottom: 13px;
}
.card-name {
  font-size: 2em
}
.edit-icon {
  line-height: 24px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
}
.ot-header {
  background-color: rgb(233, 233, 233);
}
</style>
