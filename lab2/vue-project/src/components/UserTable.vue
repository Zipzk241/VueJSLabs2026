<script setup>
import UserRow from './UserRow.vue'

defineProps({
  users: { type: Array, required: true },
})

const emit = defineEmits(['select'])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Ім'я</th>
        <th>Email</th>
        <th>Роль</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <UserRow v-for="user in users" :key="user.id" :user="user" @select="emit('select', $event)" />
      <tr v-if="users.length === 0">
        <td colspan="5" class="muted">Користувачів не знайдено</td>
      </tr>
    </tbody>
  </table>
</template>
