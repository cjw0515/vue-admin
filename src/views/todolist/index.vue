<template>
  <div id="todoapp">
    <Header />
    <TodoInput @addTodo="addTodo" />
    <TodoList
      :props-data="todos"
      @setModTarget="setModTarget"
      @modifyTodo="modifyTodo"
      @removeTodo="removeTodo"
    />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import TodoInput from './components/TodoInput.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import { addTodo, getTodos, deleteTodo, modifyTodo } from '@/api/todo'

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
      loading: false
    }
  },
  created: function() {
    this.getTodos()
  },
  methods: {
    // 삽입
    async addTodo(text) {
      const tempObj = {
        todo: text
      }
      console.log(text)
      const { data } = await addTodo(tempObj)
      console.log(data)
      this.getTodos()
    },
    // 리스트
    async getTodos() {
      const { data } = await getTodos()
      if (!data) return false
      data.forEach(element => {
        element['isModFlag'] = false
      })
      this.todos = data
    },
    // 제거
    async removeTodo(idx) {
      await deleteTodo(idx)
      this.getTodos()
    },
    async modifyTodo(idx, data) {
      await modifyTodo(idx, { todo: data })
      this.setModTarget(idx, data)
    },
    setModTarget(idx, data) {
      console.log(`data: ${data}`)
      const newList = this.todos.map(el => {
        const tmpEl =
          el.id === idx
            ? {
              ...el,
              isModFlag: !el.isModFlag,
              todo: data || el.todo
            }
            : { ...el }
        return tmpEl
      })
      this.todos = newList
    }
  }
}
</script>

<style scoped>
#todo {
  background-color: black;
}
</style>
