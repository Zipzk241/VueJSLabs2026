<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  todo: { type: Object, required: true },
})
const emit = defineEmits(['toggle', 'remove', 'update'])

const priorityLabels = { low: 'Низький', medium: 'Середній', high: 'Високий' }

const isEditing = ref(false)
const draft = reactive({ title: '', description: '', priority: 'medium' })
const error = ref('')

const createdAtText = computed(() => new Date(props.todo.createdAt).toLocaleString('uk-UA'))

function startEdit() {
  Object.assign(draft, {
    title: props.todo.title,
    description: props.todo.description,
    priority: props.todo.priority,
  })
  error.value = ''
  isEditing.value = true
}

function save() {
  if (!draft.title.trim() || !draft.description.trim()) {
    error.value = 'Назва та опис не можуть бути порожніми'
    return
  }
  emit('update', {
    title: draft.title.trim(),
    description: draft.description.trim(),
    priority: draft.priority,
  })
  isEditing.value = false
}
</script>

<template>
  <div class="card item" :class="[`priority-${todo.priority}`, { done: todo.status === 'done' }]">
    <template v-if="!isEditing">
      <div class="top">
        <input
          type="checkbox"
          :checked="todo.status === 'done'"
          :title="todo.status === 'done' ? 'Позначити активним' : 'Позначити виконаним'"
          @change="emit('toggle')"
        />
        <h3 class="title">{{ todo.title }}</h3>
        <span class="badge" :class="`badge-${todo.priority}`">{{ priorityLabels[todo.priority] }}</span>
      </div>
      <p class="description">{{ todo.description }}</p>
      <div class="bottom">
        <small>
          Створено: {{ createdAtText }} ·
          <span v-show="todo.status === 'done'">виконано</span>
          <span v-show="todo.status === 'active'">активне</span>
        </small>
        <div class="buttons">
          <button class="secondary" @click="startEdit">Редагувати</button>
          <button class="danger" @click="emit('remove')">Видалити</button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="grid">
        <div>
          <label>Назва</label>
          <input v-model="draft.title" type="text" />
        </div>
        <div>
          <label>Пріоритет</label>
          <select v-model="draft.priority">
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </div>
      </div>
      <div class="edit-row">
        <label>Опис</label>
        <textarea v-model="draft.description"></textarea>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="buttons edit-row">
        <button @click="save">Зберегти</button>
        <button class="secondary" @click="isEditing = false">Скасувати</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.item {
  border-left: 5px solid #9ca3af;
}
.priority-low {
  border-left-color: #22c55e;
}
.priority-medium {
  border-left-color: #f59e0b;
}
.priority-high {
  border-left-color: #ef4444;
}

.top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.title {
  margin: 0;
  flex: 1;
}
.done .title,
.done .description {
  text-decoration: line-through;
  color: #9ca3af;
}
.description {
  margin: 8px 0;
  white-space: pre-wrap;
}
.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  color: #fff;
}
.badge-low {
  background: #22c55e;
}
.badge-medium {
  background: #f59e0b;
}
.badge-high {
  background: #ef4444;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: #6b7280;
}
.buttons {
  display: flex;
  gap: 8px;
}
.edit-row {
  margin-top: 12px;
}
</style>
