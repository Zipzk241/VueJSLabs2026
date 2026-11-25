<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composables/useToast'

const { t, n, te } = useI18n()
const cart = useCartStore()
const { items, totalCount, totalPrice } = storeToRefs(cart)
const toast = useToast()

// назва береться з перекладів, а якщо ключа немає - зі збереженого значення
function itemTitle(item) {
  const key = `products.${item.id}.title`
  return te(key) ? t(key) : item.title
}

function clearCart() {
  cart.clear()
  toast.show(t('cart.cleared'))
}
</script>

<template>
  <section>
    <h1>{{ t('cart.title') }}</h1>

    <div v-if="!items.length" class="empty">
      <p class="muted">{{ t('cart.empty') }}</p>
      <RouterLink to="/" class="btn">{{ t('cart.goToCatalog') }}</RouterLink>
    </div>

    <template v-else>
      <table class="table">
        <thead>
          <tr>
            <th>{{ t('cart.product') }}</th>
            <th>{{ t('cart.price') }}</th>
            <th>{{ t('cart.qty') }}</th>
            <th>{{ t('cart.sum') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ itemTitle(item) }}</td>
            <td>{{ n(item.price, 'currency') }}</td>
            <td>
              <div class="qty">
                <button class="btn secondary" type="button" @click="cart.decrease(item.id)">−</button>
                <span>{{ item.qty }}</span>
                <button
                  class="btn secondary"
                  type="button"
                  @click="cart.add({ id: item.id, title: item.title, price: item.price })"
                >
                  +
                </button>
              </div>
            </td>
            <td>{{ n(item.price * item.qty, 'currency') }}</td>
            <td>
              <button class="btn danger" type="button" @click="cart.remove(item.id)">
                {{ t('cart.remove') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div>
          <div class="muted">{{ t('cart.totalCount', { count: totalCount }, totalCount) }}</div>
          <div class="total">{{ t('cart.totalPrice') }}: {{ n(totalPrice, 'currency') }}</div>
        </div>
        <button class="btn secondary" type="button" @click="clearCart">{{ t('cart.clear') }}</button>
      </div>
    </template>
  </section>
</template>

<style scoped>
.empty {
  padding: 40px 0;
  text-align: center;
}

.table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
  background: var(--surface);
  border-radius: 12px;
  overflow: hidden;
}

th,
td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.qty {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty .btn {
  padding: 2px 10px;
}

.summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.total {
  font-size: 22px;
  font-weight: 700;
}
</style>
