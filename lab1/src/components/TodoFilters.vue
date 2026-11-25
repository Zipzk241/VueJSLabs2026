<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { uk } from 'date-fns/locale'

defineProps({
  // reactive-об'єкт фільтрів з батьківського компонента
  filters: { type: Object, required: true },
  hasActiveFilters: Boolean,
})

const emit = defineEmits(['clear'])
</script>

<template>
  <div class="card">
    <div class="grid">
      <div>
        <label for="f-title">Назва</label>
        <input id="f-title" v-model="filters.title" type="text" placeholder="Пошук за назвою" />
      </div>
      <div>
        <label for="f-description">Опис</label>
        <input
          id="f-description"
          v-model="filters.description"
          type="text"
          placeholder="Пошук за описом"
        />
      </div>
      <div>
        <label for="f-status">Статус</label>
        <select id="f-status" v-model="filters.status">
          <option value="all">Усі</option>
          <option value="active">Активні</option>
          <option value="done">Виконані</option>
        </select>
      </div>
      <div>
        <label for="f-priority">Пріоритет</label>
        <select id="f-priority" v-model="filters.priority">
          <option value="all">Усі</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>
      <div>
        <label>Створено від</label>
        <VueDatePicker
          v-model="filters.dateFrom"
          :time-config="{ enableTimePicker: false }"
          :max-date="filters.dateTo || undefined"
          :formats="{ input: 'dd.MM.yyyy' }"
          placeholder="Дата від"
          auto-apply
          :locale="uk"
        />
      </div>
      <div>
        <label>Створено до</label>
        <VueDatePicker
          v-model="filters.dateTo"
          :time-config="{ enableTimePicker: false }"
          :min-date="filters.dateFrom || undefined"
          :formats="{ input: 'dd.MM.yyyy' }"
          placeholder="Дата до"
          auto-apply
          :locale="uk"
        />
      </div>
    </div>
    <div class="actions">
      <button class="secondary" :disabled="!hasActiveFilters" @click="emit('clear')">
        Очистити фільтри
      </button>
    </div>
  </div>
</template>

<style scoped>
.actions {
  margin-top: 12px;
}
</style>
