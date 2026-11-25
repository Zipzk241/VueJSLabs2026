<script setup>
defineProps({
  pageCount: { type: Number, required: true },
})

const page = defineModel({ required: true })
</script>

<template>
  <div class="pagination">
    <button class="secondary" :disabled="page === 1" @click="page--">Назад</button>
    <button
      v-for="n in pageCount"
      :key="n"
      :class="{ secondary: n !== page }"
      @click="page = n"
    >
      {{ n }}
    </button>
    <button class="secondary" :disabled="page === pageCount" @click="page++">Далі</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
