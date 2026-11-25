<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_KEY } from '@/composables/useAuth'
import AuthLayout from '@/components/AuthLayout.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const auth = inject(AUTH_KEY)
const router = useRouter()
const serverError = ref('')

function onSubmit(data) {
  const result = auth.register(data)
  if (!result.ok) {
    serverError.value = result.error
    return
  }
  router.push({ name: 'admin-dashboard' })
}
</script>

<template>
  <AuthLayout>
    <template #title>Реєстрація</template>

    <RegisterForm :server-error="serverError" @submit="onSubmit" />

    <template #footer>
      Вже є акаунт? <RouterLink to="/login">Увійти</RouterLink>
    </template>
  </AuthLayout>
</template>
