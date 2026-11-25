import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: 'ua',
    profile: {
      name: '',
      email: '',
      phone: '',
    },
  }),
  actions: {
    setLocale(lang) {
      if (lang === 'ua' || lang === 'en') {
        this.locale = lang
      }
    },
    saveProfile({ name, email, phone }) {
      this.profile = { name, email, phone }
    },
  },
  persist: true,
})
