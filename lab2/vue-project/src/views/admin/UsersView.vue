<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_KEY } from '@/composables/useAuth'
import BaseCard from '@/components/BaseCard.vue'
import UserTable from '@/components/UserTable.vue'

const auth = inject(AUTH_KEY)
const router = useRouter()
const search = ref('')

const filteredUsers = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return auth.users.value
  return auth.users.value.filter(
    (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
  )
})

// подія піднімається: UserRow -> UserTable -> UsersView
function openUser(id) {
  router.push({ name: 'admin-user', params: { id } })
}
</script>

<template>
  <h2>Користувачі</h2>

  <BaseCard>
    <template #header>
      <input v-model="search" type="text" placeholder="Пошук за ім'ям або email" class="search" />
    </template>
    <UserTable :users="filteredUsers" @select="openUser" />
    <template #footer>Показано {{ filteredUsers.length }} з {{ auth.users.value.length }}</template>
  </BaseCard>
</template>

<style scoped>
.search {
  width: 100%;
  max-width: 320px;
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font: inherit;
}
</style>
