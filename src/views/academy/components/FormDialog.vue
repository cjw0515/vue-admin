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
        ref="academyForm"
        :model="formData"
        :label-position="formDialogData.labelPosition"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="공식이름" prop="instiName">
              <el-input v-model.number="formData.instiName" style="padding: 5px" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="한글 이름" prop="instiKname">
              <el-input v-model.number="formData.instiKname" style="padding: 5px" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div style="margin: 20px 0;" class="sub-title">주소(도로명)</div>
            <el-form-item prop="address1" label="주소" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.address1" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div style="margin: 20px 0;" class="sub-title">주소(지번)</div>
            <el-form-item prop="oldAddress" label="주소" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.oldAddress" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="building" label="빌딩" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.building" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="address3" label="동" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.address3" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="zipcode" label="우편번호" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.zipcode" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="oldZipcode" label="우편번호" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.oldZipcode" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item prop="phonNum1" label="전화번호" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.phonNum1" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="1" class="line">-</el-col>
          <el-col :span="2">
            <el-form-item prop="phonNum2">
              <el-input v-model.number="formData.phonNum2" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="1" class="line">-</el-col>
          <el-col :span="2">
            <el-form-item prop="phonNum3">
              <el-input v-model.number="formData.phonNum3" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="margin: 20px 0;" class="sub-title">지리정보</div>
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
                    style="width:500px;height:400px;"
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
            <div style="margin: 20px 0;" class="sub-title">확인여부</div>
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
import VueDaumMap from '@/components/DaumMap'

export default {
  components: { VueDaumMap },
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
    }
  },
  data() {
    return {
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
      mapAPIKey: 'fa5bbaa22e298e97f79812b9ff7994d0', // 테스트용 appkey
      center: { lat: 33.450701, lng: 126.570667 }, // 지도의 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도),
      mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
      libraries: [], // 추가로 불러올 라이브러리
      map: null, // 지도 객체. 지도가 로드되면 할당됨.
      marker: null
    }
  },
  watch: {
    formDialogData: {
      handler() {
        if (this.formDialogData.idx) {
          this.getAAcademy(this.formDialogData.idx)
        }
      },
      deep: true
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
    resetForm() {
      this.formData = {
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
        confirmYn: 0,
        itemName: '',
        itemValue: ''
      }
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
        this.formData[key] = data[key]
      }
      this.setCenter({ lat: this.formData.latitude || 33.450701, lng: this.formData.longitude || 126.570667 })
      this.marker.setPosition(new kakao.maps.LatLng(this.formData.latitude, this.formData.longitude))
    },
    setCenter(centerObj) {
      this.center = centerObj
    },
    parsedPhoneNumber(idx) {
      return
    }
  }
}
</script>
<style>
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
  color: #1890ff;
  font-weight: bold;
}
</style>
