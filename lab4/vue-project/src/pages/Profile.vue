<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const settings = useSettingsStore()
const toast = useToast()

const form = reactive({
  name: settings.profile.name,
  email: settings.profile.email,
  password: '',
  phone: settings.profile.phone,
})

// у errors зберігаються ключі перекладів, текст підставляється в шаблоні
const errors = reactive({ name: '', email: '', password: '', phone: '' })

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^\+380\d{9}$/

function validate() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.phone = ''

  const name = form.name.trim()
  if (!name) errors.name = 'nameRequired'
  else if (name.length < 2) errors.name = 'nameShort'

  const email = form.email.trim()
  if (!email) errors.email = 'emailRequired'
  else if (!emailRe.test(email)) errors.email = 'emailInvalid'

  if (!form.password) errors.password = 'passwordRequired'
  else if (form.password.length < 8) errors.password = 'passwordShort'
  else if (!/[A-Za-zА-Яа-яІіЇїЄєҐґ]/.test(form.password) || !/\d/.test(form.password))
    errors.password = 'passwordWeak'

  const phone = form.phone.replace(/[\s()-]/g, '')
  if (!phone) errors.phone = 'phoneRequired'
  else if (!phoneRe.test(phone)) errors.phone = 'phoneInvalid'

  return !errors.name && !errors.email && !errors.password && !errors.phone
}

function onSubmit() {
  if (!validate()) {
    return
  }
  settings.saveProfile({
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.replace(/[\s()-]/g, ''),
  })
  form.password = ''
  toast.show(t('profile.saved', { name: form.name.trim() }))
}
</script>

<template>
  <section class="profile">
    <h1>{{ t('profile.title') }}</h1>
    <p class="muted">{{ t('profile.subtitle') }}</p>

    <form class="form" novalidate @submit.prevent="onSubmit">
      <label class="field">
        <span>{{ t('profile.name') }}</span>
        <input v-model="form.name" type="text" :placeholder="t('profile.namePlaceholder')" />
        <small v-if="errors.name" class="error">{{ t(`profile.errors.${errors.name}`) }}</small>
      </label>

      <label class="field">
        <span>{{ t('profile.email') }}</span>
        <input v-model="form.email" type="email" :placeholder="t('profile.emailPlaceholder')" />
        <small v-if="errors.email" class="error">{{ t(`profile.errors.${errors.email}`) }}</small>
      </label>

      <label class="field">
        <span>{{ t('profile.password') }}</span>
        <input v-model="form.password" type="password" :placeholder="t('profile.passwordPlaceholder')" />
        <small v-if="errors.password" class="error">{{ t(`profile.errors.${errors.password}`) }}</small>
      </label>

      <label class="field">
        <span>{{ t('profile.phone') }}</span>
        <input v-model="form.phone" type="tel" :placeholder="t('profile.phonePlaceholder')" />
        <small v-if="errors.phone" class="error">{{ t(`profile.errors.${errors.phone}`) }}</small>
      </label>

      <button class="btn" type="submit">{{ t('profile.submit') }}</button>
    </form>
  </section>
</template>

<style scoped>
.profile {
  max-width: 460px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
}

input {
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  background: var(--surface);
  color: var(--text);
}

input:focus {
  outline: 2px solid var(--accent);
  border-color: transparent;
}

.error {
  color: var(--danger);
  font-weight: 400;
}
</style>
