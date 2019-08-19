<template>
  <div>
    <ul>
      <Todo
        v-for="todo in propsData"
        :key="todo.id"
        :todo="todo"
        @handleDoubleClick="handleDoubleClick"
        @handleClickModBtn="handleClickModBtn"
        @deleteTodo="deleteTodo"
      />
    </ul>
  </div>
</template>
<script>
import Todo from './Todo.vue'

export default {
  components: {
    Todo
  },
  props: {
    propsData: {
      type: Array,
      default: function() {
        return []
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
      this.$emit('removeTodo', idx)
    },
    handleDoubleClick(idx) {
      this.$emit('setModTarget', idx)
    },
    handleClickModBtn(idx, data) {
      this.$emit('modifyTodo', idx, data)
    }
  }
}
</script>
<style>

</style>
