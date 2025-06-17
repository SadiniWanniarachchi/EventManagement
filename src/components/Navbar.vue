<template>
  <div class="navbar-wrapper">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <div class="brand-container">
            <i class="ph ph-calendar-check brand-icon"></i>
            <span class="brand-text">EventEase</span>
          </div>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="ph ph-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="ph ph-house"></i>
                <span>Home</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/news">
                <i class="ph ph-calendar"></i>
                <span>Events</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">
                <i class="ph ph-info"></i>
                <span>About</span>
              </router-link>
            </li>
            <template v-if="isAuthenticated">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle user-menu"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div class="user-avatar">
                    <span>{{ user?.name?.charAt(0).toUpperCase() }}</span>
                  </div>
                  <span class="user-name">{{ user?.name }}</span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link class="dropdown-item" to="/profile">
                      <i class="ph ph-user"></i>
                      <span>Profile</span>
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                      <i class="ph ph-sign-out"></i>
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link login-btn" to="/login">
                  <i class="ph ph-sign-in"></i>
                  <span>Login</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link register-btn" to="/register">
                  <i class="ph ph-user-plus"></i>
                  <span>Register</span>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  padding: 1rem;
  pointer-events: none;
}

.navbar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: var(--navbar-height);
  padding: 0.5rem 1.5rem;
  pointer-events: auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.navbar .container {
  height: 100%;
  display: flex;
  align-items: center;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.brand-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.brand-text {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

.navbar-nav {
  gap: 0.75rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem !important;
  color: var(--text-color) !important;
  font-weight: 500;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-link i {
  font-size: 1.3rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: var(--primary-color) !important;
  background: rgba(230, 57, 70, 0.08);
  transform: translateY(-2px);
}

.nav-link:hover i {
  transform: scale(1.15) rotate(5deg);
}

.nav-link.router-link-active {
  color: var(--primary-color) !important;
  background: rgba(230, 57, 70, 0.12);
  font-weight: 600;
}

/* User Menu Styles */
.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.2rem !important;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.2);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-menu:hover .user-avatar {
  transform: scale(1.1) rotate(5deg);
}

.user-name {
  font-weight: 500;
}

/* Login/Register Buttons */
.login-btn {
  color: var(--primary-color) !important;
  border: 2px solid var(--primary-color);
  padding: 0.6rem 1.5rem !important;
  border-radius: 20px;
}

.login-btn:hover {
  background: rgba(230, 57, 70, 0.1);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.register-btn {
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white !important;
  padding: 0.6rem 1.5rem !important;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.15);
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(230, 57, 70, 0.25);
}

/* Dropdown Menu */
.dropdown-menu {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  min-width: 220px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.2rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.dropdown-item:hover {
  background: rgba(230, 57, 70, 0.08);
  color: var(--primary-color);
  transform: translateX(4px);
}

.dropdown-item i {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.dropdown-divider {
  margin: 0.75rem 0;
  border-color: rgba(0, 0, 0, 0.05);
}

/* Mobile Menu */
@media (max-width: 991.98px) {
  .navbar-wrapper {
    padding: 0.75rem;
  }

  .navbar {
    border-radius: 20px;
    padding: 0.5rem 1rem;
  }

  .navbar-toggler {
    border: none;
    padding: 0.5rem;
    font-size: 1.5rem;
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  .navbar-toggler:hover {
    color: var(--primary-color);
    transform: scale(1.1);
  }

  .navbar-collapse {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }

  .navbar-nav {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.8rem 1.2rem !important;
  }

  .user-menu {
    padding: 0.8rem 1.2rem !important;
  }

  .login-btn,
  .register-btn {
    text-align: center;
    justify-content: center;
    width: 100%;
  }
}
</style> 