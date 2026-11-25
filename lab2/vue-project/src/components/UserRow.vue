<script setup>
const props = defineProps({
  user: { type: Object, required: true },
})

const emit = defineEmits(['select'])
</script>

<template>
  <tr>
    <td>{{ user.id }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>
      <span class="badge" :class="user.role">{{ user.role }}</span>
    </td>
    <td>
      <button class="secondary" @click="emit('select', props.user.id)">Деталі</button>
    </td>
  </tr>
</template>
