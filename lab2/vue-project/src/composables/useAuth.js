import { reactive, computed } from 'vue'

// ключ для provide/inject
export const AUTH_KEY = Symbol('auth')

const ACCOUNTS_KEY = 'lab2-accounts'
const SESSION_KEY = 'lab2-session'

const seedAccounts = [
  { id: 1, name: 'Адміністратор', email: 'admin@example.com', password: 'admin123', role: 'admin', createdAt: '2026-01-10T09:00:00.000Z' },
  { id: 2, name: 'Олена Коваль', email: 'olena@example.com', password: 'user1234', role: 'manager', createdAt: '2026-02-03T11:20:00.000Z' },
  { id: 3, name: 'Максим Шевченко', email: 'maxym@example.com', password: 'user1234', role: 'user', createdAt: '2026-02-14T15:45:00.000Z' },
  { id: 4, name: 'Ірина Бондар', email: 'iryna@example.com', password: 'user1234', role: 'user', createdAt: '2026-03-01T08:10:00.000Z' },
  { id: 5, name: 'Андрій Мельник', email: 'andrii@example.com', password: 'user1234', role: 'manager', createdAt: '2026-03-18T13:30:00.000Z' },
  { id: 6, name: 'Наталія Ткачук', email: 'natalia@example.com', password: 'user1234', role: 'user', createdAt: '2026-04-05T10:00:00.000Z' },
  { id: 7, name: 'Василь Кравченко', email: 'vasyl@example.com', password: 'user1234', role: 'user', createdAt: '2026-05-21T16:40:00.000Z' },
  { id: 8, name: 'Софія Литвин', email: 'sofia@example.com', password: 'user1234', role: 'user', createdAt: '2026-06-09T12:15:00.000Z' },
]

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// імітація бекенду: акаунти та сесія зберігаються в LocalStorage
const state = reactive({
  accounts: readJson(ACCOUNTS_KEY, seedAccounts),
  currentId: readJson(SESSION_KEY, null),
})

function saveAccounts() {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(state.accounts))
}

const user = computed(() => state.accounts.find((a) => a.id === state.currentId) ?? null)
const isAuthenticated = computed(() => user.value !== null)
const isAdmin = computed(() => user.value?.role === 'admin')

// список користувачів без паролів
const users = computed(() => state.accounts.map(({ password, ...rest }) => rest))

function login(email, password) {
  const account = state.accounts.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
  )
  if (!account) {
    return { ok: false, error: 'Невірний email або пароль' }
  }
  state.currentId = account.id
  localStorage.setItem(SESSION_KEY, JSON.stringify(account.id))
  return { ok: true }
}

function register({ name, email, password }) {
  const exists = state.accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())
  if (exists) {
    return { ok: false, error: 'Користувач з таким email вже існує' }
  }
  const account = {
    id: Math.max(0, ...state.accounts.map((a) => a.id)) + 1,
    name: name.trim(),
    email: email.trim(),
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  }
  state.accounts.push(account)
  saveAccounts()
  state.currentId = account.id
  localStorage.setItem(SESSION_KEY, JSON.stringify(account.id))
  return { ok: true }
}

function logout() {
  state.currentId = null
  localStorage.removeItem(SESSION_KEY)
}

export function useAuth() {
  return { user, users, isAuthenticated, isAdmin, login, register, logout }
}

