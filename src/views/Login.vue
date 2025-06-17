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
          <h1 class="auth-title">Welcome Back!</h1>
          <p class="auth-subtitle">Chill With Events!</p>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
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
              placeholder="Enter your password"
            />
            <div id="passwordError" class="invalid-feedback" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>

          <div class="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" class="auth-submit-btn">
            Sign In <i class="fas fa-arrow-right"></i>
          </button>
        </form>

        <div class="auth-footer">
          <p>
            New to our platform? 
            <router-link to="/register">Create an account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth' // Adjust path if needed

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errors = ref({
  email: '',
  password: ''
})

const validateForm = () => {
  let isValid = true
  errors.value = { email: '', password: '' }

  if (!email.value) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long'
    isValid = false
  }
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    // Simulating a successful login
    const mockUser = {
      id: 1, // Or Date.now() for a simple unique mock ID
      email: email.value,
      name: email.value.split('@')[0] || 'Test User'
    }
    const mockToken = `mock-jwt-token-${Date.now()}`
    
    localStorage.setItem('user', JSON.stringify(mockUser))
    authStore.login(mockUser, mockToken)
    router.push('/news')
  } catch (error) {
    console.error('Login failed:', error)
    // Handle actual API errors here, e.g., set a general error message
    // errors.value.general = 'Login failed. Please check credentials.';
  }
}
</script>

<style scoped>
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
  max-width: 480px;
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
  margin-bottom: 2.5rem;
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

.forgot-password {
  text-align: right;
  margin-bottom: 1.5rem;
}

.forgot-password a {
  color: var(--accent-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.forgot-password a:hover {
  text-decoration: underline;
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
}

.auth-submit-btn i {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.auth-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(230, 57, 70, 0.3);
}

.auth-submit-btn:hover i {
  transform: translateX(3px);
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

@media (max-width: 576px) {
  .auth-container {
    padding: 1rem;
  }
  
  .auth-card {
    padding: 2rem;
  }

  .auth-title {
    font-size: 1.75rem;
  }
  
  .logo-icon {
    width: 60px;
    height: 60px;
  }
}
</style>