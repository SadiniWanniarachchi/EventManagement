<template>
  <Navbar />
  <div class="container main-content-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

:root {
  /* New pinkish-red color scheme */
  --primary-color: #e63946;      /* Brick Red */
  --primary-dark: #c1121f;       /* Darker Brick Red */
  --secondary-color: #ff8fa3;    /* Soft Pink */
  --accent-color: #ff4d6d;       /* Bright Pink */
  --dark-color: #590d22;         /* Deep Burgundy */
  --light-color: #fff0f3;        /* Light Pink */
  --text-color: #4a4a4a;         /* Ash Gray */
  --text-light: #6c757d;         /* Medium Ash Gray */
  --background-color: #fff5f6;   /* Very Light Pink */
  --card-shadow: 0 4px 6px rgba(230, 57, 70, 0.1);
  --navbar-height: 70px;
  
  /* RGB values for rgba usage */
  --primary-color-rgb: 230, 57, 70;
  --secondary-color-rgb: 255, 143, 163;
  --accent-color-rgb: 255, 77, 109;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

.main-content-container {
  min-height: calc(100vh - var(--navbar-height));
  box-sizing: border-box;
  padding-top: calc(var(--navbar-height) + 2rem);
  padding-bottom: 1.5rem;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #e9ecef;
}

::-webkit-scrollbar-thumb {
  background: var(--secondary-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* Responsive Adjustments */
@media (max-width: 575.98px) {
  .main-content-container {
    padding-top: calc(var(--navbar-height) + 1rem);
    padding-bottom: 1rem;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .main-content-container {
    padding-top: calc(var(--navbar-height) + 1.25rem);
    padding-bottom: 1.25rem;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .main-content-container {
    padding-top: calc(var(--navbar-height) + 1.5rem);
    padding-bottom: 1.5rem;
  }
}

@media (min-width: 992px) {
  .main-content-container {
    padding-top: calc(var(--navbar-height) + 2rem);
    padding-bottom: 2rem;
  }
}

@media (min-width: 1200px) {
  .main-content-container {
    padding-top: calc(var(--navbar-height) + 2.5rem);
    padding-bottom: 2.5rem;
  }
}

@media (min-width: 1400px) {
  .main-content-container {
    padding-top: calc(var(--navbar-height) + 3rem);
    padding-bottom: 3rem;
  }
}
</style>