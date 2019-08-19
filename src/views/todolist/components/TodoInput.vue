<template>
  <div>
    <input
      v-model="todoText"
      type="text"
      @keyup.enter="addTodo"
    >
    <button @click="addTodo">추가</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todoText: ''
    }
  },
  methods: {
    addTodo() {
      const text = this.todoText
      this.removeTxt()
      this.$emit('addTodo', text)
    },
    removeTxt() {
      this.todoText = ''
    }
  }
}
</script>
<style>
</style>
