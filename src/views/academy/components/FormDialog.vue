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
              <el-input v-model.number="formData.age" style="padding: 5px" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="한글 이름" prop="age">
              <el-input v-model.number="formData.age" style="padding: 5px" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div style="margin: 20px 0;" class="sub-title">주소(도로명)</div>
            <el-form-item prop="age" label="주소" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div style="margin: 20px 0;" class="sub-title">주소(지번)</div>
            <el-form-item prop="age" label="주소" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="age" label="빌딩" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="age" label="동" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="age" label="우편번호" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="age" label="우편번호" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item prop="age" label="전화번호" :label-width="formDialogData.formLabelWidth">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="1" class="line">-</el-col>
          <el-col :span="2">
            <el-form-item prop="age">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="1" class="line">-</el-col>
          <el-col :span="2">
            <el-form-item prop="age">
              <el-input v-model.number="formData.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="margin: 20px 0;" class="sub-title">지리정보</div>
            <el-container>
              <el-aside>
                <el-form-item prop="age" label="위도">
                  <el-input v-model.number="formData.age" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="age" label="경도">
                  <el-input v-model.number="formData.age" autocomplete="off" />
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
                  />
                </el-main>
              </el-container>
            </el-container>
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
import { addCodeAge } from "@/api/insti/age-code";
import VueDaumMap from "@/components/DaumMap";

export default {
  components: { VueDaumMap },
  props: {
    formDialogData: {
      type: Object,
      default: function() {
        return {
          dialogStatus: "create",
          formDialogVisible: false,
          textMap: {
            update: "수정",
            create: "추가"
          },
          width: "70%",
          formLabelWidth: "120px",
          labelPosition: "top",
          idx: 0
        };
      }
    }
  },
  data() {
    return {
      formData: {
        age: "",
        gbn: "",
        ageName: ""
      },
      codeTypesOptions: [
        { label: "별칭(A)", value: "A" },
        { label: "그룹(C)", value: "C" },
        { label: "공식명칭(O)", value: "O" }
      ],
      rules: {
        gbn: [
          {
            required: true,
            message: "분류코드를 선택해 주세요.",
            trigger: "blur"
          }
        ],
        age: [
          { required: true, message: "나이를 기입해주세요." },
          { type: "number", message: "나이는 숫자여야만 합니다." }
        ],
        ageName: [
          { required: true, message: "명칭을 적어주세요.", trigger: "blur" }
        ]
      },
      mapAPIKey: "fa5bbaa22e298e97f79812b9ff7994d0", // 테스트용 appkey
      center: { lat: 33.450701, lng: 126.570667 }, // 지도의 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도),
      mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
      libraries: [], // 추가로 불러올 라이브러리
      map: null, // 지도 객체. 지도가 로드되면 할당됨.
      marker: null
    };
  },
  mounted: function() {
    console.log("mounted");
  },
  methods: {
    handleClickConfirm() {
      this.$refs["ageInertForm"].validate(valid => {
        if (valid) {
          addCodeAge(this.formData).then(() => {
            this.$message({
              message: "등록되었습니다!",
              type: "success"
            });
            this.$emit("toggleDialog");
            this.resetForm();
          });
        }
      });
    },
    handleClickClose() {
      this.$emit("toggleDialog");
    },
    resetForm() {
      this.formData = {
        age: "",
        gbn: "",
        ageName: ""
      };
    },
    onLoad(map, marker) {
      this.map = map;
      this.marker = marker;
    }
  }
};
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
