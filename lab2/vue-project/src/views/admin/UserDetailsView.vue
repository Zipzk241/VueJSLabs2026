<script setup>
import { computed, inject } from 'vue'
import { AUTH_KEY } from '@/composables/useAuth'
import BaseCard from '@/components/BaseCard.vue'

// id приходить з маршруту через props: true
const props = defineProps({
  id: { type: String, required: true },
})

const auth = inject(AUTH_KEY)

const user = computed(() => auth.users.value.find((u) => u.id === Number(props.id)))
const createdAt = computed(() =>
  user.value ? new Date(user.value.createdAt).toLocaleString('uk-UA') : '',
)
</script>

<template>
  <RouterLink to="/admin/users">← До списку користувачів</RouterLink>

  <BaseCard v-if="user" class="details">
    <template #header>{{ user.name }}</template>
    <dl>
      <dt>ID</dt>
      <dd>{{ user.id }}</dd>
      <dt>Email</dt>
      <dd>{{ user.email }}</dd>
      <dt>Роль</dt>
      <dd>
        <span class="badge" :class="user.role">{{ user.role }}</span>
      </dd>
      <dt>Дата реєстрації</dt>
      <dd>{{ createdAt }}</dd>
    </dl>
    <template #footer>
      <span v-if="user.id === auth.user.value.id">Це ваш акаунт</span>
      <span v-else>Інший користувач</span>
    </template>
  </BaseCard>

  <p v-else class="muted">Користувача з id {{ id }} не знайдено.</p>
</template>

<style scoped>
.details {
  margin-top: 16px;
  max-width: 480px;
}

dl {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 8px 12px;
  margin: 0;
}

dt {
  color: #6b7280;
}

dd {
  margin: 0;
}
</style>
