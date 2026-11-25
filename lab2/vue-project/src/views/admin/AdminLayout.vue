<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_KEY } from '@/composables/useAuth'

const auth = inject(AUTH_KEY)
const router = useRouter()

function onLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="admin">
    <header class="topbar">
      <div class="brand">Admin</div>
      <nav>
        <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
        <RouterLink to="/admin/users">Users</RouterLink>
        <RouterLink to="/admin/reports">Reports</RouterLink>
      </nav>
      <div class="user">
        <!-- дані з inject -->
        <span v-if="auth.user.value">{{ auth.user.value.name }}</span>
        <span v-if="auth.isAdmin.value" class="badge admin">admin</span>
        <button class="secondary" @click="onLogout">Вийти</button>
      </div>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  background: #1f2937;
  color: #fff;
  flex-wrap: wrap;
}

.brand {
  font-weight: 700;
  font-size: 18px;
}

nav {
  display: flex;
  gap: 4px;
  flex: 1;
}

nav a {
  color: #d1d5db;
  padding: 6px 12px;
  border-radius: 6px;
}

nav a:hover {
  background: #374151;
  text-decoration: none;
}

/* активний маршрут (linkActiveClass: 'active') */
nav a.active {
  background: #2563eb;
  color: #fff;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.content {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>
