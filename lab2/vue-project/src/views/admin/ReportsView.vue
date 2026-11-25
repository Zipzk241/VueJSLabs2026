<script setup>
import BaseCard from '@/components/BaseCard.vue'

const reports = [
  { id: 1, title: 'Активність користувачів', period: 'Жовтень 2026', status: 'Готовий' },
  { id: 2, title: 'Нові реєстрації', period: 'Жовтень 2026', status: 'Готовий' },
  { id: 3, title: 'Помилки входу', period: 'Листопад 2026', status: 'В обробці' },
  { id: 4, title: 'Використання ролей', period: 'Листопад 2026', status: 'Готовий' },
]
</script>

<template>
  <h2>Звіти</h2>

  <BaseCard>
    <template #header>Список звітів</template>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Назва</th>
          <th>Період</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reports" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ r.title }}</td>
          <td>{{ r.period }}</td>
          <td>{{ r.status }}</td>
        </tr>
      </tbody>
    </table>
    <template #footer>Дані імітовані локально</template>
  </BaseCard>
</template>
