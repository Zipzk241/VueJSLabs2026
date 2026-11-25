<script setup>
import AdSlot from '@/components/AdSlot.vue'

const facts = [
  { value: '2026', label: 'рік заснування' },
  { value: '6', label: 'актуальних рубрик' },
  { value: '24/7', label: 'оновлення новин' },
]
</script>

<template>
  <div class="about">
    <h1>Про нас</h1>
    <p>
      NewsDaily - навчальний прототип сайту новин, створений у межах лабораторної роботи з Vue.js. Проєкт
      демонструє стилізацію компонентів (scoped-стилі та CSS Modules), перемикання теми та анімації
      переходів між сторінками.
    </p>
    <p>
      Дані новин зберігаються локально у масиві, без реального бекенду. Кожна новина відкривається на
      окремій сторінці з рекламним банером і модальним вікном.
    </p>

    <ul class="facts">
      <li v-for="f in facts" :key="f.label">
        <b>{{ f.value }}</b>
        <span>{{ f.label }}</span>
      </li>
    </ul>

    <!-- статичний рекламний слот №2 -->
    <AdSlot label="Партнер">
      <div class="promo">Партнерський блок: розмістіть тут свою рекламу</div>
    </AdSlot>
  </div>
</template>

<style scoped>
.about {
  max-width: 760px;
}

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  padding: 0;
  margin: 24px 0;
  list-style: none;
}

.facts li {
  padding: 16px;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.facts b {
  display: block;
  font-size: 28px;
  color: var(--accent);
}

.facts span {
  color: var(--text-muted);
  font-size: 14px;
}

.promo {
  padding: 28px;
  text-align: center;
  font-weight: 600;
  background: linear-gradient(90deg, #059669, #0ea5e9);
  color: #fff;
}
</style>
