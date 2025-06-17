import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function setUser(userData: User) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function login(userData: User, newToken: string) {
    setUser(userData)
    setToken(newToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Initialize user from localStorage if token exists
  if (token.value) {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    login,
    logout
  }
}) 