<template>
  <section class="card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>
    <div class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="card-footer muted">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.card-body {
  padding: 16px;
}

.card-footer {
  padding: 10px 16px;
  border-top: 1px solid #e5e7eb;
  font-size: 13px;
}
</style>
