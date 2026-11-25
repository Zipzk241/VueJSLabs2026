<script setup>
import { inject } from 'vue'
import { AUTH_KEY } from '@/composables/useAuth'

const auth = inject(AUTH_KEY)
</script>

<template>
  <div class="home">
    <h1>Адмін-панель</h1>
    <p class="muted">Прототип з імітованою автентифікацією (Vue 3 + Vue Router 4)</p>

    <!-- умовне відображення на основі inject -->
    <template v-if="auth.isAuthenticated.value">
      <p>
        Ви увійшли як <b>{{ auth.user.value.name }}</b>
      </p>
      <div class="actions">
        <RouterLink to="/admin/dashboard" class="btn">Перейти в адмін-панель</RouterLink>
        <button class="secondary" @click="auth.logout()">Вийти</button>
      </div>
    </template>
    <template v-else>
      <div class="actions">
        <RouterLink to="/login" class="btn">Увійти</RouterLink>
        <RouterLink to="/register" class="btn secondary">Реєстрація</RouterLink>
      </div>
      <p class="muted hint">Демо-акаунт: admin@example.com / admin123</p>
    </template>
  </div>
</template>

<style scoped>
.home {
  max-width: 520px;
  margin: 0 auto;
  padding: 80px 16px;
  text-align: center;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.hint {
  font-size: 13px;
  margin-top: 16px;
}
</style>
