<script setup>
import { computed } from 'vue'
// CSS Modules: стилі в NewsCard.module.css доступні як $style / styles
import styles from './NewsCard.module.css'

const props = defineProps({
  article: { type: Object, required: true },
})

const dateText = computed(() =>
  new Date(props.article.date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
)
</script>

<template>
  <article :class="styles.card">
    <img :class="styles.image" :src="article.image" :alt="article.title" />
    <div :class="styles.body">
      <time :class="styles.date" :datetime="article.date">{{ dateText }}</time>
      <h3 :class="styles.title">{{ article.title }}</h3>
      <p :class="styles.excerpt">{{ article.excerpt }}</p>
      <RouterLink :class="styles.button" :to="{ name: 'article', params: { id: article.id } }">
        Читати далі
      </RouterLink>
    </div>
  </article>
</template>
