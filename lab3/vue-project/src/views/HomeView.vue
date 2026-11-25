<script setup>
import { news } from '@/data/news'
import NewsCard from '@/components/NewsCard.vue'
import AdSlot from '@/components/AdSlot.vue'
</script>

<template>
  <div>
    <h1>Останні новини</h1>

    <!-- статичний рекламний слот №1 -->
    <AdSlot>
      <div class="promo">Дізнавайтесь першими: підписуйтесь на розсилку NewsDaily</div>
    </AdSlot>

    <div class="grid">
      <NewsCard v-for="article in news" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.promo {
  padding: 28px;
  text-align: center;
  font-weight: 600;
  background: linear-gradient(90deg, var(--accent), #8b5cf6);
  color: #fff;
}
</style>
