<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['add'])

const form = reactive({ title: '', description: '', priority: 'medium' })
const error = ref('')

function submit() {
  if (!form.title.trim() || !form.description.trim()) {
    error.value = 'Заповніть назву та опис завдання'
    return
  }
  emit('add', {
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority,
  })
  Object.assign(form, { title: '', description: '', priority: 'medium' })
  error.value = ''
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <div class="grid">
      <div>
        <label for="new-title">Назва</label>
        <input id="new-title" v-model="form.title" type="text" placeholder="Що потрібно зробити?" />
      </div>
      <div>
        <label for="new-priority">Пріоритет</label>
        <select id="new-priority" v-model="form.priority">
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>
    </div>
    <div class="row">
      <label for="new-description">Опис</label>
      <textarea id="new-description" v-model="form.description" placeholder="Деталі завдання"></textarea>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="row">
      <button type="submit">Додати</button>
    </div>
  </form>
</template>

<style scoped>
.row {
  margin-top: 12px;
}
</style>
