<template>
  <li
    @dblclick="handleDoubleClick(todo.id)"
  >
    <div v-if="todo.isModFlag">
      {{ `${todo.id} -` }}<input v-model="modInput" type="text"><button @click="handleClickModBtn(todo.id)">수정</button>
    </div>
    <div v-else>
      {{ `${todo.id} -  ${todo.todo}` }}
    </div>
    <button @click="deleteTodo(todo.id)">삭제</button>
  </li>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      modInput: ''
    }
  },
  methods: {
    deleteTodo(idx) {
      console.log(idx)
      this.$emit('deleteTodo', idx)
    },
    handleDoubleClick(idx) {
      this.modInput = ''
      this.$emit('handleDoubleClick', idx)
    },
    handleClickModBtn(idx) {
      this.$emit('handleClickModBtn', idx, this.modInput)
      this.modInput = ''
    }
  }
}
</script>
<style>

</style>
