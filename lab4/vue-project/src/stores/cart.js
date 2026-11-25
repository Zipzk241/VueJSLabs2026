import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  },
  actions: {
    add(product) {
      const found = this.items.find((item) => item.id === product.id)
      if (found) {
        found.qty++
      } else {
        this.items.push({ id: product.id, title: product.title, price: product.price, qty: 1 })
      }
    },
    decrease(id) {
      const found = this.items.find((item) => item.id === id)
      if (!found) return
      if (found.qty > 1) {
        found.qty--
      } else {
        this.remove(id)
      }
    },
    remove(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clear() {
      this.items = []
    },
  },
  persist: true,
})
