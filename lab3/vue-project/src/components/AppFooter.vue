<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container bar">
      <span>© {{ year }} NewsDaily. Усі права захищено.</span>
      <nav class="links">
        <RouterLink to="/">Головна</RouterLink>
        <RouterLink to="/about">Про нас</RouterLink>
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 14px;
  transition: background-color 0.3s;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 18px;
  padding-bottom: 18px;
}

.links {
  display: flex;
  gap: 16px;
}
</style>
