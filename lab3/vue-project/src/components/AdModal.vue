<script setup>
import { watch, onBeforeUnmount } from 'vue'
import styles from './AdModal.module.css'
import adImage from '@/assets/images/ad.svg'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

// закриття по Esc та блокування прокрутки сторінки, поки відкрите вікно
watch(
  () => props.open,
  (value) => {
    if (value) {
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <!-- Transition керує плавним показом/закриттям (класи .modal-* нижче) -->
    <Transition name="modal">
      <div v-if="open" :class="styles.overlay" @click.self="emit('close')">
        <div :class="styles.modal" role="dialog" aria-modal="true">
          <button :class="styles.close" type="button" aria-label="Закрити" @click="emit('close')">
            ✕
          </button>
          <img :class="styles.image" :src="adImage" alt="Рекламний банер" />
          <div :class="styles.content">
            <h3 :class="styles.title">Мега розпродаж</h3>
            <p :class="styles.text">
              Тільки цього тижня знижки до 70% на всі товари. Встигніть скористатися вигідною
              пропозицією!
            </p>
            <button :class="styles.action" type="button" @click="emit('close')">Зрозуміло</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* Класи Transition не належать CSS Modules, тому оголошені глобально з префіксом modal-.
   Фон з'являється плавно, а саме вікно додатково масштабується. */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active [role='dialog'],
.modal-leave-active [role='dialog'] {
  transition: transform 0.3s ease;
}

.modal-enter-from [role='dialog'],
.modal-leave-to [role='dialog'] {
  transform: scale(0.9) translateY(20px);
}
</style>
