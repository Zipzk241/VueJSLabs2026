<template>
  <div class="auth-page">
    <div class="auth-card">
      <RouterLink to="/" class="back">← На головну</RouterLink>
      <h1>
        <!-- іменований слот для заголовка -->
        <slot name="title">Автентифікація</slot>
      </h1>

      <!-- основний слот (форма) -->
      <slot />

      <!-- іменований слот для нижнього посилання -->
      <p v-if="$slots.footer" class="footer muted">
        <slot name="footer" />
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.back {
  font-size: 13px;
}

h1 {
  margin: 12px 0 16px;
  font-size: 24px;
}

.footer {
  margin: 16px 0 0;
  text-align: center;
  font-size: 14px;
}
</style>
