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
        :model="formData.insti"
        :label-position="formDialogData.labelPosition"
        :rules="rules"
      >
        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-name">일반</span>
          </div>
          <div>
            <el-row>
              <div class="sub-title">
                <span>이름</span>
              </div>
              <el-col :span="12">
                <el-form-item label="공식이름" prop="instiName">
                  <el-input
                    v-model.number="formData.insti.instiName"
                    style="padding: 5px;width: 70%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="한글 이름" prop="instiKname">
                  <el-input
                    v-model.number="formData.insti.instiKname"
                    style="padding: 5px;width: 70%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <div class="sub-title">
                  <span>주소(도로명)</span>
                </div>
                <el-form-item
                  prop="address1"
                  label="주소"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model.number="formData.insti.address1"
                    style="width:80%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="sub-title">
                  <span>주소(지번)</span>
                </div>
                <el-form-item
                  prop="oldAddress"
                  label="주소"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model.number="formData.insti.oldAddress"
                    style="width:80%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  prop="building"
                  label="빌딩"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model.number="formData.insti.building"
                    style="width:80%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="address3"
                  label="동"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model.number="formData.insti.address3"
                    style="width:80%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  prop="zipcode"
                  label="우편번호"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model.number="formData.insti.zipcode"
                    style="width:80%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="oldZipcode"
                  label="우편번호"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model.number="formData.insti.oldZipcode"
                    style="width:80%"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="전화번호"
                  type="text"
                  :label-width="formDialogData.formLabelWidth"
                >
                  <el-input
                    v-model="formData.TPData.itemValue"
                    autocomplete="off"
                    style="width:80%"
                    @input="dispPhoneNumber"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <div class="sub-title">
                  <span>지리정보</span>
                </div>
                <el-container>
                  <el-aside>
                    <el-form-item prop="latitude" label="위도">
                      <el-input v-model.number="formData.insti.latitude" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="longitude" label="경도">
                      <el-input v-model.number="formData.insti.longitude" autocomplete="off" />
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

          </div>
        </el-card>
        <!-- 운영 -->
        <el-card v-if="formDialogData.dialogStatus == 'update'" shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-name">운영</span>
          </div>
          <div>
            <el-row>
              <div class="sub-title">
                <span>운영 시간</span>
                <svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('OTForm')" />
              </div>
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
                    align="center"
                  >
                    <template #default="{ row }">
                      <div>{{ row[dayObj.seq] }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title">
                <span>대상 학년</span>
                <svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('TGForm')" />
              </div>
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
                    align="center"
                  >
                    <template #default="{ row }">
                      <div
                        :style="{color: row[obj.codeNo] ? 'blue' : 'red'}"
                      >{{ row[obj.codeNo] ? 'O' : 'X' }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title">
                <span>주 대상</span>
                <svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('TGForm')" />
              </div>
              <el-col :span="24">
                <el-table
                  :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                  border
                  :data="dispMainTG.data"
                  style="width: 100%"
                >
                  <el-table-column
                    v-for="obj in dispMainTG.col"
                    :key="obj.seq"
                    :label="obj.itemValue"
                    align="center"
                  >
                    <template #default="{ row }">
                      <div
                        :style="{color: row[obj.seq] == 1 ? 'blue' : 'red'}"
                      >{{ row[obj.seq] == 1 ? 'O' : 'X' }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title">
                <span />
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item prop="entranExamYn" label="입학테스트 여부">
                    <el-select v-model="formData.insti.entranExamYn" placeholder="Select">
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
                  <el-form-item
                    prop="numLimit"
                    label="정원"
                    :label-width="formDialogData.formLabelWidth"
                  >
                    <el-input
                      v-model.number="formData.insti.numLimit"
                      style="width:80%"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="homeworkAmount" label="숙제량">
                    <el-select v-model="formData.insti.homeworkAmount" placeholder="Select">
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
        <!-- 과목 -->
        <el-card v-if="formDialogData.dialogStatus == 'update'" shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-name">과목</span>
          </div>
          <div>
            <el-row>
              <div class="sub-title">
                <span>대표과목</span>
                <svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('SJForm')" />
              </div>
              <el-col v-for="(value, key, idx) in formData.SJData" :key="idx" :span="4">
                <el-table
                  :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                  border
                  :data="value.list"
                  empty-text="-"
                  style="width: 100%"
                >
                  <el-table-column :label="value.label" prop="disp" />
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <div class="sub-title">
                <span>특화</span>
                <svg-icon icon-class="edit" class="edit-icon" @click="openInnerDialog('SCForm')" />
              </div>
              <el-table
                :data="formData.SCData"
                :header-cell-style="{ backgroundColor: 'rgb(233, 233, 233)' }"
                border
                empty-text="-"
                style="width: 60%"
              >
                <el-table-column label="항목" width="100">
                  <template slot-scope="{row}">
                    <span>{{ row.itemValue }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="값">
                  <template slot-scope="{row}">
                    <span>{{ row.itemProperty.replace(/\|/gi, ', ') }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>

          </div>
        </el-card>
        <!-- 최종 확인 -->
        <el-card v-if="formDialogData.dialogStatus == 'update'" shadow="hover" class="box-card">
          <el-row>
            <el-col :span="5">
              <div class="sub-title">
                <span>최종 확인 여부</span>
              </div>
              <el-form-item prop="confirmYn">
                <el-switch
                  v-model="formData.insti.confirmYn"
                  :active-value="trueVal"
                  :inactive-value="falseVal"
                  active-text="확인"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickClose">Cancel</el-button>
        <el-button type="primary" @click="handleClickConfirm()">Confirm</el-button>
      </span>
      <InnerDialog
        :key="getKey()"
        :inner-visible.sync="innerVisible"
        :insti-id="formDialogData.idx"
        :inner-form-name="innerFormName"
        :form-data="formData"
        :dialog-status="formDialogData.dialogStatus"
        @toggleInnerDialog="toggleInnerDialog()"
        @setFormData="setFormData"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getAAcademy, updateAcademy, addAcademy } from '@/api/insti/academy'
import VueDaumMap from '@/components/DaumMap'
import InnerDialog from './innerDIalog/InnerDialog'
import { createUniqueString, parseTime } from '@/utils/index'
import { generateInstiData, dataDivider } from '@/utils/insti/'

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
      trueVal: 1,
      falseVal: 0,
      innerFormName: '',
      // 초기화 데이터 사용 여부.
      formData: {
        insti: {
          // 일반
          instiName: '',
          instiKname: '',
          address1: '',
          address2: '',
          address3: '',
          building: '',
          zipcode: '',
          oldAddress: '',
          oldZipcode: '',
          latitude: '',
          longitude: '',
          instiImg: '',
          updId: '',
          founder: '',
          confirmYn: 0,
          entranExamYn: 0,
          homeworkAmount: 1,
          numLimit: 0,
          openFlexYn: false
        },
        // 운영
        OTData: {
          openFlexYn: 0,
          openFlexTime: {
            itemName: 'OT',
            seq: 8,
            useYn: true,
            itemValue: '동일 시간',
            itemProperty: '',
            prefixdTime: [
              new Date(2020, 1, 1, 9, 0),
              new Date(2020, 1, 1, 23, 0)
            ]
          },
          daysOT: [
            {
              openStat: true,
              itemName: 'OT',
              seq: 1,
              useYn: true,
              itemValue: '월',
              itemProperty: '',
              prefixdTime: []
            },
            {
              openStat: true,
              itemName: 'OT',
              seq: 2,
              useYn: true,
              itemValue: '화',
              itemProperty: '',
              prefixdTime: []
            },
            {
              openStat: true,
              itemName: 'OT',
              seq: 3,
              useYn: true,
              itemValue: '수',
              itemProperty: '',
              prefixdTime: []
            },
            {
              openStat: true,
              itemName: 'OT',
              seq: 4,
              useYn: true,
              itemValue: '목',
              itemProperty: '',
              prefixdTime: []
            },
            {
              openStat: true,
              itemName: 'OT',
              seq: 5,
              useYn: true,
              itemValue: '금',
              itemProperty: '',
              prefixdTime: []
            },
            {
              openStat: true,
              itemName: 'OT',
              seq: 6,
              useYn: true,
              itemValue: '토',
              itemProperty: '',
              prefixdTime: []
            },
            {
              openStat: false,
              itemName: 'OT',
              seq: 7,
              useYn: true,
              itemValue: '일',
              itemProperty: '',
              prefixdTime: []
            }
          ]
        },
        TGData: [
          {
            itemName: 'TG',
            seq: 1,
            useYn: true,
            itemValue: '유치원',
            itemProperty: '0',
            targetLevels: [
              { gbn: 'AG', codeNo: 7, useYn: false, disp: '유치원' }
            ]
          },
          {
            itemName: 'TG',
            seq: 2,
            useYn: true,
            itemValue: '초등',
            itemProperty: '0',
            targetLevels: [
              { gbn: 'AG', codeNo: 8, useYn: false, disp: '초1' },
              { gbn: 'AG', codeNo: 9, useYn: false, disp: '초2' },
              { gbn: 'AG', codeNo: 10, useYn: false, disp: '초3' },
              { gbn: 'AG', codeNo: 11, useYn: false, disp: '초4' },
              { gbn: 'AG', codeNo: 12, useYn: false, disp: '초5' },
              { gbn: 'AG', codeNo: 13, useYn: false, disp: '초6' }
            ]
          },
          {
            itemName: 'TG',
            seq: 3,
            useYn: true,
            itemValue: '중등',
            itemProperty: '0',
            targetLevels: [
              { gbn: 'AG', codeNo: 14, useYn: false, disp: '중1' },
              { gbn: 'AG', codeNo: 15, useYn: false, disp: '중2' },
              { gbn: 'AG', codeNo: 16, useYn: false, disp: '중3' }
            ]
          },
          {
            itemName: 'TG',
            seq: 4,
            useYn: true,
            itemValue: '고등',
            itemProperty: '0',
            targetLevels: [
              { gbn: 'AG', codeNo: 17, useYn: false, disp: '고1' },
              { gbn: 'AG', codeNo: 18, useYn: false, disp: '고2' },
              { gbn: 'AG', codeNo: 19, useYn: false, disp: '고3' }
            ]
          },
          {
            itemName: 'TG',
            seq: 5,
            useYn: true,
            itemValue: 'N수',
            itemProperty: '0',
            targetLevels: [{ gbn: 'AG', codeNo: 20, useYn: false, disp: 'N수' }]
          }
        ],
        SJData: {
          OSData: {
            disp: 'OSData',
            label: '개설 과목',
            list: []
          },
          R1Data: {
            disp: 'R1Data',
            label: '공통',
            list: []
          },
          R2Data: {
            disp: 'R2Data',
            label: '초등',
            list: []
          },
          R3Data: {
            disp: 'R3Data',
            label: '중등',
            list: []
          },
          R4Data: {
            disp: 'R4Data',
            label: '고등',
            list: []
          },
          R5Data: {
            disp: 'R5Data',
            label: 'N수',
            list: []
          }
        },
        TPData: {
          itemName: 'TP',
          seq: 1,
          useYn: true,
          itemValue: '',
          itemProperty: ''
        },
        SCData: []
      },
      entrExmOptions: [
        { value: 0, disp: '아니오' },
        { value: 1, disp: '예' }
      ],
      homworkOptions: [
        { value: 1, disp: '적음' },
        { value: 2, disp: '보통' },
        { value: 3, disp: '많음' }
      ],
      rules: {
        // age: [
        //   { required: true, message: '나이를 기입해주세요.',trigger: 'blur' },
        //   { type: 'number', message: '나이는 숫자여야만 합니다.' }
        // ],
        instiName: [{ required: true, message: '기입해 주세요.' }]
        // instiKname: [{ required: true, message: '기입해 주세요.' }],
        // address1: [{ required: true, message: '기입해 주세요.' }],
        // address3: [{ required: true, message: '기입해 주세요.' }],
        // building: [{ required: true, message: '기입해 주세요.' }],
        // zipcode: [{ required: true, message: '기입해 주세요.' }],
        // oldAddress: [{ required: true, message: '기입해 주세요.' }],
        // oldZipcode: [{ required: true, message: '기입해 주세요.' }],
        // latitude: [{ required: true, message: "기입해 주세요." }],
        // longitude: [{ required: true, message: "기입해 주세요." }],
        // confirmYn: [{ required: true, message: '기입해 주세요.' }],
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
        rstObj[obj.seq] =
          obj.itemProperty != 0 &&
          obj.itemProperty != ''
          // && !this.formData.OTData.openFlexYn
            ? parseTime(obj['prefixdTime'][0], '{h}시 {i}분') +
              ' ~ ' +
              parseTime(obj['prefixdTime'][1], '{h}시 {i}분')
            : '-'
      })
      return [rstObj]
    },
    dispTG: function() {
      const tmpArr = []

      this.formData.TGData.forEach(o => {
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

      tmpArr = this.formData.TGData.map(o => o)
      const tmpDataObj = {}
      tmpArr.forEach(o => {
        tmpDataObj[o.seq] = o.itemProperty
      })

      return { col: tmpArr, data: [tmpDataObj] }
    },
    currentFlexData: function() {
      return this.formData.insti.openFlexYn
    },
    // dispSC: function() {
    //   const data = this.formData.SCData.map(o => {
    //     let tmpValues = ''
    //     o.values.forEach(value => {
    //       tmpValues += value.disp + ','
    //     })
    //     return {
    //       ...o,
    //       valuesText: tmpValues
    //     }
    //   })
    //   return data
    // }
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
    dispPhoneNumber(v) {
      v = v.replace(/[^0-9]/g, '')
      this.formData.TPData.itemValue = v.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
    },
    handleClickConfirm() {
      let payload
      this.$refs['academyForm'].validate(valid => {
        if (valid) {
          if (this.formDialogData.dialogStatus == 'update') {
            payload = this.getPayload(['insti', 'TPData'])
            // payload = this.getPayload(["insti", "OTData", "TGData", "SJData", "TPData"])
            // console.log(payload)
            // return
            updateAcademy(this.formDialogData.idx, payload).then(() => {
              this.$message({
                message: '수정되었습니다!',
                type: 'success'
              })
              this.$emit('toggleDialog')
              this.resetForm()
            }
            )
          } else {
            payload = this.getPayload(['insti', 'TPData'])
            // return
            addAcademy(payload).then(() => {
              this.$message({
                message: '추가되었습니다!',
                type: 'success'
              })
              this.$emit('toggleDialog')
              this.resetForm()
              this.$emit('refreshList')
            })
          }
        }
      })
    },
    getPayload(dataKeys) {
      const payload = {}
      let detailData = []
      let additionData = []

      dataKeys.forEach(key => {
        if (this.formData[key]) payload[key] = this.formData[key]
      })
      detailData = generateInstiData(payload, ['gbn', 'codeNo', 'useYn'])
      additionData = generateInstiData(payload, [
        'itemName',
        'seq',
        'itemValue',
        'itemProperty',
        'useYn'
      ])
      payload['detailData'] = detailData
      payload['additionData'] = additionData

      return payload
    },
    selectedFormData() {
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
      this.formData.insti.latitude = latlng.getLat()
      this.formData.insti.longitude = latlng.getLng()
    },
    async getAAcademy(id) {
      let { data } = await getAAcademy(id)
      const devider = new dataDivider()
      data = devider.dispatchData(data.details, data.additions).mergeData(data)

      for (const key in this.formData) {
        if (data[key]) {
          if (this.formData[key]) this.formData[key] = data[key]
        }
      }
      // 추가 로직....개선 필요..
      this.formData.OTData.openFlexYn = this.formData.insti.openFlexYn

      this.setCenter({
        lat: this.formData.insti.latitude || 33.450701,
        lng: this.formData.insti.longitude || 126.570667
      })
      this.marker.setPosition(
        new kakao.maps.LatLng(
          this.formData.insti.latitude || 33.450701,
          this.formData.insti.longitude || 126.570667
        )
      )
    },
    setCenter(centerObj) {
      this.center = centerObj
    },
    getKey() {
      return createUniqueString()
    },
    setFormData(dataKey, data, cb) {
      this.formData[dataKey] = data
      if (cb && typeof (cb) === 'function') {
        cb(this.formData)
      }
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
  font-size: 2em;
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
