<template>
  <div>
    <ul>
      <li v-for="(todo, index) in propsData" :key="index">{{ todo.todo }}
        <button @click="deleteTodo(index)">삭제</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['propsData'],
  methods: {
    deleteTodo(idx) {
      this.$emit('removeTodo', idx)
    }
  }
}
</script>
<style>

</style>
