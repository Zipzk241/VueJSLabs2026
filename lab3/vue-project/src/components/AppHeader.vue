<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="header">
    <div class="container bar">
      <RouterLink to="/" class="logo">📰 NewsDaily</RouterLink>
      <nav class="nav">
        <RouterLink to="/" active-class="inactive" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.3s;
}

.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 60px;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  color: var(--text);
}

.logo:hover {
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav a {
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--text-muted);
}

.nav a:hover {
  background: var(--bg);
  text-decoration: none;
}

/* активний пункт меню (linkActiveClass: 'active') */
.nav a.active {
  background: var(--accent);
  color: var(--accent-contrast);
}
</style>
