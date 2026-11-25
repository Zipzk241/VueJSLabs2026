<script setup>
import { ref, reactive, computed, watch } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoItem from './components/TodoItem.vue'
import TodoPagination from './components/TodoPagination.vue'

const STORAGE_KEY = 'lab1-todos'
const PAGE_SIZE = 5

// зчитування списку з LocalStorage на старті
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const todos = ref(loadTodos())

// запис у LocalStorage при будь-якій зміні списку
watch(
  todos,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

const emptyFilters = () => ({
  title: '',
  description: '',
  status: 'all',
  priority: 'all',
  dateFrom: null,
  dateTo: null,
})

const filters = reactive(emptyFilters())
const page = ref(1)

// лічильники
const totalCount = computed(() => todos.value.length)
const activeCount = computed(() => todos.value.filter((t) => t.status === 'active').length)
const doneCount = computed(() => todos.value.filter((t) => t.status === 'done').length)

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function endOfDay(date) {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d.getTime()
}

const filteredTodos = computed(() => {
  const f = filters
  const title = f.title.trim().toLowerCase()
  const description = f.description.trim().toLowerCase()

  return todos.value.filter((t) => {
    if (title && !t.title.toLowerCase().includes(title)) return false
    if (description && !t.description.toLowerCase().includes(description)) return false
    if (f.status !== 'all' && t.status !== f.status) return false
    if (f.priority !== 'all' && t.priority !== f.priority) return false
    const created = new Date(t.createdAt).getTime()
    if (f.dateFrom && created < startOfDay(f.dateFrom)) return false
    if (f.dateTo && created > endOfDay(f.dateTo)) return false
    return true
  })
})

const hasActiveFilters = computed(() => {
  const f = filters
  return Boolean(
    f.title.trim() ||
      f.description.trim() ||
      f.status !== 'all' ||
      f.priority !== 'all' ||
      f.dateFrom ||
      f.dateTo,
  )
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredTodos.value.length / PAGE_SIZE)))

const pagedTodos = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredTodos.value.slice(start, start + PAGE_SIZE)
})

// при зміні фільтрів повертаємось на першу сторінку
watch(filters, () => (page.value = 1))

// якщо після видалення поточна сторінка зникла
watch(pageCount, (count) => {
  if (page.value > count) page.value = count
})

function addTodo({ title, description, priority }) {
  todos.value.unshift({
    id: Date.now(),
    title,
    description,
    status: 'active',
    createdAt: new Date().toISOString(),
    priority,
  })
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.status = todo.status === 'active' ? 'done' : 'active'
}

function removeTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

function updateTodo(id, changes) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) Object.assign(todo, changes)
}

function clearFilters() {
  Object.assign(filters, emptyFilters())
}
</script>

<template>
  <div class="container">
    <h1>To-Do список</h1>

    <TodoForm @add="addTodo" />

    <div class="card counters">
      <span>Всього: <b>{{ totalCount }}</b></span>
      <span>Активних: <b>{{ activeCount }}</b></span>
      <span>Виконаних: <b>{{ doneCount }}</b></span>
    </div>

    <TodoFilters :filters="filters" :has-active-filters="hasActiveFilters" @clear="clearFilters" />

    <div v-if="pagedTodos.length" class="list">
      <TodoItem
        v-for="todo in pagedTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo(todo.id)"
        @remove="removeTodo(todo.id)"
        @update="(changes) => updateTodo(todo.id, changes)"
      />
    </div>
    <p v-else-if="totalCount === 0" class="card empty">Список порожній. Додайте перше завдання.</p>
    <p v-else class="card empty">За вказаними фільтрами нічого не знайдено.</p>

    <TodoPagination v-if="pageCount > 1" v-model="page" :page-count="pageCount" />
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 16px;
}

.counters {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.empty {
  text-align: center;
  color: #6b7280;
}
</style>
