<template>
  <div class="not-found">
    <h1>404</h1>
    <p class="muted">Сторінку не знайдено</p>
    <RouterLink to="/" class="btn">На головну</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px 16px;
}

h1 {
  font-size: 64px;
  margin-bottom: 8px;
}
</style>
