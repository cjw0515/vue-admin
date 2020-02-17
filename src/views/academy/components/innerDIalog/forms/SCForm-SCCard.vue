<template>
  <div>
    <el-card
      shadow="hover"
      class="box-card"
    >
      <div slot="header" class="clearfix">
        <span class="card-name">
          <span v-if="!data.edit"> {{ data.itemValue }} </span>
          <el-input v-if="data.edit" v-model="data.editValue" class="edit-input" size="small" />
        </span>
        <span v-if="data.edit">
          <el-button
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="handleEdit()"
          >Ok</el-button>
          <el-button
            class="cancel-btn"
            size="small"
            icon="el-icon-refresh"
            type="warning"
            @click="cancelEdit()"
          >cancel</el-button>
        </span>
        <el-button
          v-else
          round
          size="small"
          icon="el-icon-edit"
          @click="data.edit=!data.edit"
        >{{ !data.itemValue ? '항목 이름을 넣어주세요.' :'수정' }}</el-button>
        <el-button v-if="dialogStatus == 'update'" type="primary" icon="el-icon-download" size="mini" circle @click="resetCS()" />
        <el-button type="danger" icon="el-icon-remove-outline" size="mini" circle @click="resetCS()" />
      </div>
      <el-button :type="isEmpty ? getType(4) : getType(0)" icon="el-icon-arrow-right" circle class="add-btn" @click="handleClickAdd()" />
      <span v-if="data.itemProperty">
        <el-tag
          v-for="(txt, id) in data.itemProperty.split('|')"
          :key="id"
          closable
          :type="txt.type"
          :disable-transitions="false"
          @close="handleClickDeleteBtn(txt)"
        >
          {{ txt }}
        </el-tag>
      </span>
      <el-input
        v-if="data.inputVisible"
        ref="saveTagInput"
        v-model="data.inputValue"
        class="input-new-tag"
        size="mini"
        @keyup.enter.native="handleInputConfirm()"
        @blur="handleInputConfirm()"
      />
      <el-button v-else size="mini" class="button-new-tag" @click="showInput">+ New Tag</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    dialogStatus: {
      type: String,
      default: ''
    },
    instiId: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    },
    isEmpty: {
      type: Boolean,
      default: true
    },
    chkedNodes: {
      thpe: Array,
      default: () => []
    }
  },
  data: function() {
    return {

    }
  },
  methods: {
    handleClickAdd() {
      let text = ''
      this.chkedNodes.forEach(o => {
        if (!this.chkDuplication(o)) text += `|${o}`
      })
      this.data.itemProperty += this.data.itemProperty ? text : text.substring(1)
    },
    handleEdit() {
      this.data.itemValue = this.data.editValue
      this.data.edit = false
    },
    cancelEdit() {
      this.data.edit = false
    },
    resetCS() {
      this.data.itemProperty = ''
    },
    chkDuplication(txt, warning) {
      if (!txt) return false
      const ret = this.data.itemProperty.split('|').some(o => o === txt)
      if (ret && !warning) {
        this.$message({
          message: '이미 존재하는 특화 과목은 제외됩니다.',
          type: 'warning'
        })
      }
      return ret
    },
    getType(idx) {
      const types = ['success', 'info', 'warning', 'danger', '']
      return types[(idx + 1) % types.length]
    },
    handleClickDeleteBtn(SC) {
      this.data.itemProperty = this.data.itemProperty.split('|').filter(o => o !== SC).join('|')
    },
    showInput() {
      this.data.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.data.inputValue
      if (this.chkDuplication(inputValue)) { this.data.inputValue = ''; return false }
      if (inputValue) {
        this.data.itemProperty += this.data.itemProperty ? `|${inputValue}` : inputValue
      }
      this.data.inputVisible = false
      this.data.inputValue = ''
    }
  }
}
</script>
<style scoped>
.tg-row {
  height: 30px;
}
.tg-row-10 {
  height: 10px;
}
.tg-t-text {
    font-size: 110%;
    color: indigo;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 800px;
}
.search-input {
  margin-bottom: 10px
}
.add-btn {
  /* border-right: 1px black */
  margin-right: 10px;
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.el-card {
  margin-bottom: 10px;
}
.card-name{
  margin-right: 10px;
}
.el-input {
  width: 250px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
