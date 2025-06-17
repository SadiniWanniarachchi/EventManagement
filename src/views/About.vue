<template>
  <div class="about-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">About Us</h1>
        <p class="hero-subtitle">
          Learn more about our mission, values, and how we help you create successful events.
        </p>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="content-section">
      <div class="content-grid">
        <!-- Mission Card -->
        <div class="card mission-card">
          <div class="card-icon">
            <i class="fas fa-bullseye"></i>
          </div>
          <h2 class="card-title">Our Mission</h2>
          <p class="card-text">
            EventHub is dedicated to providing the best platform for event planning and management. 
            Our mission is to help you create memorable experiences through seamless organization and execution.
          </p>
          <ul class="features-list">
            <li class="feature-item">
              <i class="fas fa-check-circle"></i> 
              <span>Intuitive Planning Tools</span>
            </li>
            <li class="feature-item">
              <i class="fas fa-check-circle"></i> 
              <span>Real-time Collaboration</span>
            </li>
            <li class="feature-item">
              <i class="fas fa-check-circle"></i> 
              <span>Attendee Engagement</span>
            </li>
          </ul>
        </div>

        <!-- Welcome Card -->
        <div class="card welcome-card">
          <div class="card-icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <h2 class="card-title">Welcome Message</h2>
          <div class="form-group">
            <label for="firstName" class="form-label">First Name</label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                class="form-control"
                id="firstName"
                v-model="firstName"
                placeholder="Enter your first name"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="lastName" class="form-label">Last Name</label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                class="form-control"
                id="lastName"
                v-model="lastName"
                placeholder="Enter your last name"
              >
            </div>
          </div>
          <div v-if="fullName" class="welcome-message">
            <i class="fas fa-user-circle"></i>
            <span>Welcome, {{ fullName }}!</span>
          </div>
        </div>

        <!-- Venue Preference Card -->
        <div class="card venue-card">
          <div class="card-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <h2 class="card-title">Choose Your Preferred Venue</h2>
          <div class="venue-options">
            <div class="venue-option">
              <input
                class="venue-radio"
                type="radio"
                name="viewPreference"
                id="indoor"
                value="indoor"
                v-model="selectedView"
              >
              <label class="venue-label" for="indoor">
                <i class="fas fa-building"></i>
                <span>Indoor Venue</span>
              </label>
            </div>
            <div class="venue-option">
              <input
                class="venue-radio"
                type="radio"
                name="viewPreference"
                id="outdoor"
                value="outdoor"
                v-model="selectedView"
              >
              <label class="venue-label" for="outdoor">
                <i class="fas fa-tree"></i>
                <span>Outdoor Venue</span>
              </label>
            </div>
          </div>
          <div class="venue-image-container" v-if="selectedView">
            <img
              :src="selectedView === 'indoor' ? 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60' : 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=60'"
              :alt="selectedView + ' venue'"
              class="venue-image"
            >
            <div class="venue-overlay">
              <span>{{ selectedView === 'indoor' ? 'Indoor Venue' : 'Outdoor Venue' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')
const selectedView = ref('')

const fullName = computed(() => {
  if (firstName.value && lastName.value) {
    return `${firstName.value} ${lastName.value}`
  }
  return ''
})
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
}

/* Main Container */
.about-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary-color), var(--dark-color));
  padding: 5rem 2rem;
  color: white;
  text-align: center;
  position: relative;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Content Section */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .mission-card {
    grid-row: span 2;
  }
}

/* Card Styling */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(230, 57, 70, 0.2);
}

.card-title {
  color: var(--text-color);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
}

.card-text {
  color: var(--text-light);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

/* Features List */
.features-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  color: var(--text-color);
  font-size: 1.05rem;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-item i {
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-right: 1rem;
}

/* Form Styling */
.form-group {
  margin-bottom: 1.75rem;
}

.form-label {
  display: block;
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper i {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  font-size: 1.1rem;
}

.form-control {
  width: 100%;
  padding: 1rem 1.25rem 1rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9fa;
}

.form-control:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px rgba(255, 77, 109, 0.1);
  outline: none;
  background-color: white;
}

.welcome-message {
  background-color: var(--light-color);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  border-left: 4px solid var(--primary-color);
  animation: fadeIn 0.5s ease-out;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-message i {
  color: var(--primary-color);
  font-size: 1.75rem;
  margin-right: 1rem;
}

.welcome-message span {
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.1rem;
}

/* Venue Selection */
.venue-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 576px) {
  .venue-options {
    flex-direction: row;
    gap: 1.5rem;
  }
}

.venue-option {
  position: relative;
  flex: 1;
}

.venue-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.venue-label {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f9f9fa;
  font-weight: 500;
}

.venue-radio:checked + .venue-label {
  border-color: var(--primary-color);
  background-color: var(--light-color);
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.15);
}

.venue-label i {
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-right: 0.75rem;
}

.venue-image-container {
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
  position: relative;
}

.venue-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.venue-image-container:hover .venue-image {
  transform: scale(1.05);
}

.venue-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 2rem 1.5rem 1.5rem;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Responsive Adjustments */
@media (max-width: 991px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .card {
    padding: 2rem;
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 767px) {
  .hero-section {
    padding: 4rem 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .content-section {
    padding: 0 1.5rem 4rem;
  }
  
  .card-title {
    font-size: 1.4rem;
  }
  
  .card-text {
    font-size: 1rem;
  }
  
  .venue-image {
    height: 240px;
  }
}

@media (max-width: 575px) {
  .hero-section {
    padding: 3rem 1rem;
    margin-bottom: 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .content-section {
    padding: 0 1rem 3rem;
  }
  
  .content-grid {
    gap: 2rem;
  }
  
  .card {
    padding: 1.75rem;
  }
  
  .card-icon {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
    margin-bottom: 1.25rem;
  }
  
  .card-title {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }
  
  .venue-label {
    padding: 0.75rem 1.25rem;
  }
  
  .venue-image {
    height: 200px;
  }
  
  .venue-overlay {
    padding: 1.5rem 1.25rem 1.25rem;
    font-size: 1rem;
  }
}
</style>