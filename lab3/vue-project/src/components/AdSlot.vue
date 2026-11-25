<script setup>
defineProps({
  // якщо true - банер клікабельний і викликає подію open
  clickable: { type: Boolean, default: false },
  label: { type: String, default: 'Реклама' },
})

const emit = defineEmits(['open'])
</script>

<template>
  <aside
    class="ad"
    :class="{ clickable }"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="clickable && emit('open')"
    @keydown.enter="clickable && emit('open')"
  >
    <span class="tag">{{ label }}</span>
    <!-- вміст рекламного слота; fallback, якщо нічого не передано -->
    <slot>
      <div class="placeholder">Тут може бути ваша реклама</div>
    </slot>
  </aside>
</template>

<style scoped>
.ad {
  position: relative;
  margin: 20px 0;
  border: 1px dashed var(--border);
  border-radius: 10px;
  background: var(--surface);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.ad.clickable {
  cursor: pointer;
}

.ad.clickable:hover {
  box-shadow: var(--shadow);
}

.tag {
  position: absolute;
  top: 6px;
  right: 8px;
  z-index: 1;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  text-transform: uppercase;
}

.placeholder {
  padding: 24px;
  text-align: center;
  color: var(--text-muted);
}

.ad :slotted(img) {
  width: 100%;
  max-height: 160px;
  object-fit: cover;
}
</style>
