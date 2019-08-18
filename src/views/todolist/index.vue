<template>
  <div id="todoapp">
    {{ user }}
    <Header />
    <TodoInput @addTodo="addTodo" />
    <TodoList :props-data="todos" @removeTodo="removeTodo" />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import TodoInput from './components/TodoInput.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  components: {
    Header,
    TodoInput,
    Footer,
    TodoList
  },
  data() {
    return {
      todos: [],
      user: '',
      loading: false
    }
  },
  created: function() {
    const url = 'http://127.0.0.1:5000/user/'
    axios.get(url).then(res => {
      console.log(res.data.data[0])
    })
  },
  methods: {
    // 삽입
    addTodo(text) {
      this.todos.push(text)
    },
    // 제거
    removeTodo(idx) {
      this.todos.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
#todo {
  background-color: black;
}
</style>
