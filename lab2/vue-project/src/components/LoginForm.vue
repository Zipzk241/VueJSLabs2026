<script setup>
import { reactive, ref } from 'vue'
import BaseInput from './BaseInput.vue'

defineProps({
  // помилка, яку повертає "бекенд"
  serverError: { type: String, default: '' },
})

// подія до батьківського компонента
const emit = defineEmits(['submit'])

const form = reactive({ email: '', password: '' })
const errors = ref({})

function validate() {
  const result = {}
  if (!form.email.trim()) result.email = 'Введіть email'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) result.email = 'Невірний формат email'
  if (!form.password) result.password = 'Введіть пароль'
  else if (form.password.length < 6) result.password = 'Мінімум 6 символів'
  errors.value = result
  return Object.keys(result).length === 0
}

function onSubmit() {
  if (validate()) emit('submit', { email: form.email, password: form.password })
}
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <p v-if="serverError" class="alert">{{ serverError }}</p>
    <BaseInput
      v-model="form.email"
      label="Email"
      type="email"
      autocomplete="email"
      placeholder="admin@example.com"
      :error="errors.email"
    />
    <BaseInput
      v-model="form.password"
      label="Пароль"
      type="password"
      autocomplete="current-password"
      :error="errors.password"
    />
    <button type="submit">Увійти</button>
  </form>
</template>
