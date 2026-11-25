import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ua from './locales/ua'

// правила множини для української: 1 товар, 2 товари, 5 товарів
function uaPluralRule(choice, choicesLength) {
  if (choicesLength !== 3) {
    return choice === 1 ? 0 : 1
  }
  const mod10 = choice % 10
  const mod100 = choice % 100
  if (mod10 === 1 && mod100 !== 11) return 0
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 1
  return 2
}

const numberFormats = {
  ua: {
    currency: { style: 'currency', currency: 'UAH', currencyDisplay: 'symbol', maximumFractionDigits: 0 },
  },
  en: {
    currency: { style: 'currency', currency: 'UAH', currencyDisplay: 'code', maximumFractionDigits: 0 },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'ua',
  fallbackLocale: 'en',
  messages: { ua, en },
  numberFormats,
  pluralRules: { ua: uaPluralRule },
  modifiers: {
    upper: (str) => str.toUpperCase(),
  },
})

export default i18n
