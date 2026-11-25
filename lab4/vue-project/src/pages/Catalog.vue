<script setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composables/useToast'
import { products } from '@/data/products'

const { t, n } = useI18n()
const cart = useCartStore()
const toast = useToast()

function qtyInCart(id) {
  return cart.items.find((item) => item.id === id)?.qty ?? 0
}

function addToCart(product) {
  const title = t(`products.${product.id}.title`)
  cart.add({ id: product.id, title, price: product.price })
  toast.show(t('catalog.added', { title }))
}
</script>

<template>
  <section>
    <h1>{{ t('catalog.title') }}</h1>
    <p class="muted">{{ t('catalog.subtitle') }}</p>

    <div class="grid">
      <article v-for="product in products" :key="product.id" class="card">
        <div class="image">{{ product.emoji }}</div>
        <h3>{{ t(`products.${product.id}.title`) }}</h3>
        <p class="muted description">{{ t(`products.${product.id}.description`) }}</p>
        <div class="price">{{ n(product.price, 'currency') }}</div>
        <button class="btn" type="button" @click="addToCart(product)">
          {{ t('catalog.add') }}
        </button>
        <small v-if="qtyInCart(product.id)" class="in-cart">
          {{ t('catalog.inCart', { n: qtyInCart(product.id) }) }}
        </small>
      </article>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  font-size: 56px;
  background: var(--bg);
  border-radius: 8px;
}

h3 {
  margin: 4px 0 0;
}

.description {
  flex: 1;
  margin: 0;
  font-size: 14px;
}

.price {
  font-size: 20px;
  font-weight: 700;
}

.in-cart {
  color: #16a34a;
}
</style>
