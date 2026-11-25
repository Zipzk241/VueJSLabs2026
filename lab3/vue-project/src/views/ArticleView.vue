<script setup>
import { ref, computed } from 'vue'
import { getArticle } from '@/data/news'
import AdSlot from '@/components/AdSlot.vue'
import AdModal from '@/components/AdModal.vue'
import adImage from '@/assets/images/ad.svg'

const props = defineProps({
  id: { type: String, required: true },
})

const article = computed(() => getArticle(props.id))
const dateText = computed(() =>
  article.value
    ? new Date(article.value.date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '',
)

const isModalOpen = ref(false)
</script>

<template>
  <div>
    <RouterLink to="/" class="back">← До списку новин</RouterLink>

    <article v-if="article" class="article">
      <h1>{{ article.title }}</h1>
      <time class="date" :datetime="article.date">{{ dateText }}</time>
      <img class="cover" :src="article.image" :alt="article.title" />

      <!-- банер, що відкриває модальне вікно -->
      <AdSlot clickable @open="isModalOpen = true">
        <img :src="adImage" alt="Реклама" />
      </AdSlot>

      <p v-for="(paragraph, i) in article.content" :key="i">{{ paragraph }}</p>
    </article>

    <p v-else class="empty">Новину з id {{ id }} не знайдено.</p>

    <AdModal :open="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 16px;
}

.article {
  max-width: 760px;
}

.date {
  display: block;
  margin-bottom: 16px;
  color: var(--text-muted);
}

.cover {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 8px;
}

.empty {
  color: var(--text-muted);
}
</style>
