<script setup>
import { ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AUTH_KEY } from '@/composables/useAuth'
import AuthLayout from '@/components/AuthLayout.vue'
import LoginForm from '@/components/LoginForm.vue'

const auth = inject(AUTH_KEY)
const router = useRouter()
const route = useRoute()
const serverError = ref('')

function onSubmit({ email, password }) {
  const result = auth.login(email, password)
  if (!result.ok) {
    serverError.value = result.error
    return
  }
  router.push(route.query.redirect || { name: 'admin-dashboard' })
}
</script>

<template>
  <AuthLayout>
    <template #title>Вхід</template>

    <LoginForm :server-error="serverError" @submit="onSubmit" />

    <template #footer>
      Немає акаунта? <RouterLink to="/register">Зареєструватися</RouterLink>
    </template>
  </AuthLayout>
</template>
