<script setup>
import { useToast } from '@/composables/useToast'

const { message, type } = useToast()
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="message" class="toast" :class="type" role="status">{{ message }}</div>
    </Transition>
  </Teleport>
</template>

<style>
.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  padding: 12px 20px;
  border-radius: 8px;
  color: #fff;
  background: #16a34a;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.toast.error {
  background: #dc2626;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
