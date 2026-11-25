<script setup>
import { provide } from 'vue'
import { AUTH_KEY, useAuth } from '@/composables/useAuth'

// дані про авторизованого користувача передаються нащадкам через provide
provide(AUTH_KEY, useAuth())
</script>

<template>
  <RouterView />
</template>
