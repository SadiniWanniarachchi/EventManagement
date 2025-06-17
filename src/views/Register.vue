<template>
  <div class="auth-container">
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo-section">
            <div class="logo-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
          </div>
          <h1 class="auth-title">Create an Account</h1>
          <p class="auth-subtitle">Join our community to access all features</p>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="name" class="form-label">
              <i class="fas fa-user"></i> Full Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="name"
              :class="{ 'is-invalid': errors.name }"
              aria-describedby="nameError"
              placeholder="Enter your full name"
            />
            <div id="nameError" class="invalid-feedback" v-if="errors.name">
              {{ errors.name }}
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">
              <i class="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              :class="{ 'is-invalid': errors.email }"
              aria-describedby="emailError"
              placeholder="Enter your email"
            />
            <div id="emailError" class="invalid-feedback" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              <i class="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              :class="{ 'is-invalid': errors.password }"
              aria-describedby="passwordError"
              placeholder="Create a password"
            />
            <div id="passwordError" class="invalid-feedback" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">
              <i class="fas fa-lock"></i> Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              :class="{ 'is-invalid': errors.confirmPassword }"
              aria-describedby="confirmPasswordError"
              placeholder="Confirm your password"
            />
            <div id="confirmPasswordError" class="invalid-feedback" v-if="errors.confirmPassword">
              {{ errors.confirmPassword }}
            </div>
          </div>

          <button type="submit" class="auth-submit-btn">
            <i class="fas fa-user-plus"></i> Register
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Already have an account? 
            <router-link to="/login">Login here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  let isValid = true
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  if (!name.value) {
    errors.value.name = 'Name is required'
    isValid = false
  }

  if (!email.value) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email'
    isValid = false
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    isValid = false
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    // Here you would typically make an API call to your backend
    // For now, we'll simulate a successful registration
    const mockUser = {
      id: 1,
      email: email.value,
      name: name.value
    }
    const mockToken = 'mock-jwt-token'

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    // Use the login function from auth store
    authStore.login(mockUser, mockToken)
    router.push('/news')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<style scoped>
:root {
  --primary-color: #e63946;      /* Brick Red */
  --primary-dark: #c1121f;       /* Darker Brick Red */
  --secondary-color: #ff8fa3;    /* Soft Pink */
  --accent-color: #ff4d6d;       /* Bright Pink */
  --dark-color: #590d22;         /* Deep Burgundy */
  --light-color: #fff0f3;        /* Light Pink */
  --text-color: #2b2d42;         /* Dark Gray */
  --text-light: #8d99ae;         /* Medium Gray */
  --border-radius: 0.5rem;
  --box-shadow: 0 0.5rem 1rem rgba(230, 57, 70, 0.15);
}

.auth-container {
  min-height: 100vh;
  background: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-wrapper {
  width: 100%;
  max-width: 580px;
}

.auth-card {
  background: rgb(205, 204, 204);
  padding: 3rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.logo-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--dark-color));
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3);
}

.logo-icon i {
  font-size: 2rem;
  color: white;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: var(--text-light);
  font-size: 1.1rem;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: block;
}

.form-label i {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.form-control {
  height: 3.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e9ecef;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.2rem rgba(255, 77, 109, 0.15);
  outline: none;
}

.form-control.is-invalid {
  border-color: var(--primary-color);
}

.invalid-feedback {
  color: var(--primary-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.auth-submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  background: linear-gradient(135deg, var(--primary-color), var(--dark-color));
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.auth-submit-btn i {
  margin-right: 0.5rem;
}

.auth-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(230, 57, 70, 0.3);
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.auth-footer p {
  color: var(--text-light);
  margin: 0;
}

.auth-footer a {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
}

.auth-footer a:hover {
  text-decoration: underline;
  color: var(--primary-color);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .auth-container {
    padding: 1.5rem;
  }
  
  .auth-card {
    padding: 2.5rem;
  }

  .auth-title {
    font-size: 1.75rem;
  }
  
  .logo-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 576px) {
  .auth-container {
    padding: 1rem;
  }
  
  .auth-card {
    padding: 1.75rem;
  }

  .auth-title {
    font-size: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-control {
    height: 3.25rem;
  }
  
  .logo-icon {
    width: 50px;
    height: 50px;
  }
  
  .logo-icon i {
    font-size: 1.5rem;
  }
}

@media (max-width: 400px) {
  .auth-card {
    padding: 1.5rem;
  }
  
  .auth-title {
    font-size: 1.35rem;
  }
  
  .auth-subtitle {
    font-size: 0.95rem;
  }
  
  .form-control {
    height: 3rem;
    font-size: 0.95rem;
  }
  
  .auth-submit-btn {
    padding: 0.85rem;
    font-size: 1rem;
  }
}
</style>