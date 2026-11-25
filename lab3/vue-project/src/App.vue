<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="layout">
    <AppHeader />

    <main class="container content">
      <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 40px;
}

/* Анімація переходу між сторінками (Transition без name -> класи v-*) */
.v-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
