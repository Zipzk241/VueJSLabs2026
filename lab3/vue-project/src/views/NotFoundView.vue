<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Сторінку не знайдено</p>
    <RouterLink to="/">На головну</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 0;
}

h1 {
  font-size: 72px;
  margin-bottom: 0;
  color: var(--accent);
}

p {
  color: var(--text-muted);
}
</style>
