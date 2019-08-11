<template>
  <div class="components-container">
    <div class="editor-container">
      <div class="dndList">
        <div class="dndList-list">
          <h3>test</h3>
          <div class="list-complete-item">
            <div class="list-complete-item-handle">{{ "sdfsd" }}[{{ "sdfsd" }}] {{ "sdfsd" }}</div>
            <div style="position:absolute;right:0px;">
              <span style="float: right ;margin-top: -20px;margin-right:5px;">
                <i style="color:#ff4949" class="el-icon-delete" />
              </span>
            </div>
          </div>
          <div class="list-complete-item">
            <div class="list-complete-item-handle">{{ "sdfsd" }}[{{ "sdfsd" }}] {{ "sdfsd" }}</div>
            <div style="position:absolute;right:0px;">
              <span style="float: right ;margin-top: -20px;margin-right:5px;">
                <i style="color:#ff4949" class="el-icon-delete" />
              </span>
            </div>
          </div>
          <div class="list-complete-item">
            <div class="list-complete-item-handle">{{ "sdfsd" }}[{{ "sdfsd" }}] {{ "sdfsd" }}</div>
            <div style="position:absolute;right:0px;">
              <span style="float: right ;margin-top: -20px;margin-right:5px;">
                <i style="color:#ff4949" class="el-icon-delete" />
              </span>
            </div>
          </div>
          <div class="list-complete-item">
            <div class="list-complete-item-handle">{{ "sdfsd" }}[{{ "sdfsd" }}] {{ "sdfsd" }}</div>
            <div style="position:absolute;right:0px;">
              <span style="float: right ;margin-top: -20px;margin-right:5px;">
                <i style="color:#ff4949" class="el-icon-delete" />
              </span>
            </div>
          </div>
          <div class="list-complete-item">
            <div class="list-complete-item-handle">{{ "sdfsd" }}[{{ "sdfsd" }}] {{ "sdfsd" }}</div>
            <div style="position:absolute;right:0px;">
              <span style="float: right ;margin-top: -20px;margin-right:5px;">
                <i style="color:#ff4949" class="el-icon-delete" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DndList from '@/components/DndList'
import { fetchList } from '@/api/article'

export default {
  name: 'DndListDemo',
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list1 = response.data.items.splice(0, 5)
        this.list2 = response.data.items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
