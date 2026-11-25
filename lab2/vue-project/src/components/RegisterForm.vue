<script setup>
import { reactive, ref } from 'vue'
import BaseInput from './BaseInput.vue'

defineProps({
  serverError: { type: String, default: '' },
})

const emit = defineEmits(['submit'])

const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const errors = ref({})

function validate() {
  const result = {}
  if (!form.name.trim()) result.name = "Введіть ім'я"
  if (!form.email.trim()) result.email = 'Введіть email'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) result.email = 'Невірний формат email'
  if (!form.password) result.password = 'Введіть пароль'
  else if (form.password.length < 6) result.password = 'Мінімум 6 символів'
  if (!form.confirmPassword) result.confirmPassword = 'Підтвердіть пароль'
  else if (form.confirmPassword !== form.password) result.confirmPassword = 'Паролі не збігаються'
  errors.value = result
  return Object.keys(result).length === 0
}

function onSubmit() {
  if (validate()) {
    emit('submit', { name: form.name, email: form.email, password: form.password })
  }
}
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <p v-if="serverError" class="alert">{{ serverError }}</p>
    <BaseInput v-model="form.name" label="Ім'я" autocomplete="name" :error="errors.name" />
    <BaseInput
      v-model="form.email"
      label="Email"
      type="email"
      autocomplete="email"
      :error="errors.email"
    />
    <BaseInput
      v-model="form.password"
      label="Пароль"
      type="password"
      autocomplete="new-password"
      :error="errors.password"
    />
    <BaseInput
      v-model="form.confirmPassword"
      label="Підтвердження пароля"
      type="password"
      autocomplete="new-password"
      :error="errors.confirmPassword"
    />
    <button type="submit">Зареєструватися</button>
  </form>
</template>
