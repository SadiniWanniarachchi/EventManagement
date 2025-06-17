<template>
  <div class="home-page-wrapper">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="noise-overlay"></div>
      </div>
      
      <div class="container hero-container">
        <div class="row hero-row">
          <!-- Text Side -->
          <div class="col-lg-6 hero-text-side">
            <div class="badge-pill">
              <span class="badge-icon"><i class="fas fa-bolt"></i></span>
              <span class="badge-text">Next Generation Event Platform</span>
            </div>
            
            <h1 class="hero-title">
              <span class="text-line">Discover &</span>
              <span class="text-line">Create</span>
              <span class="text-line">Events</span>
            </h1>
            
            <p class="hero-subtitle">
              Your all-in-one platform for discovering, planning, and 
              managing exceptional events that leave lasting impressions.
            </p>
            
            <div class="hero-actions">
              <router-link to="/events" class="btn btn-primary">
                Explore Events <i class="fas fa-arrow-right"></i>
              </router-link>
              
              <router-link to="/about" class="btn btn-outline">
                Learn More
              </router-link>
            </div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-value">500</div>
                <div class="stat-label">EVENTS</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-value">10</div>
                <div class="stat-label">USERS</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-value">98</div>
                <div class="stat-label">SATISFACTION</div>
              </div>
            </div>
          </div>
          
          <!-- Visual Side -->
          <div class="col-lg-6 hero-visual-side">
            <div class="hero-image-container">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80" 
                   alt="Elegant event venue" 
                   class="hero-image">
               
               <!-- Floating Elements -->
               <div class="floating-element featured-element">
                 <div class="featured-badge">Featured</div>
                 <div class="featured-content">
                   <div class="featured-title">Tech Conference 2025</div>
                   <div class="featured-details">
                     <div class="detail-item">
                       <i class="fas fa-map-marker-alt"></i>
                       <span>San Francisco</span>
                     </div>
                     <div class="detail-item">
                       <i class="fas fa-clock"></i>
                       <span>June 15-18</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
      
      <!-- Wave Separator -->
      <div class="wave-separator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#f8f9fa" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title text-center">Powerful tools to help you at every stage of your event journey</h2>
        
        <div class="row features-row">
          <div class="col-md-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <h3 class="feature-title">Event Planning</h3>
              <p class="feature-text">Comprehensive planning tools with customizable templates and checklists.</p>
              <a href="#" class="feature-link">
                Learn more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-ticket-alt"></i>
              </div>
              <h3 class="feature-title">Ticketing</h3>
              <p class="feature-text">Seamless registration and ticketing with QR code check-in capabilities.</p>
              <a href="#" class="feature-link">
                Learn more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3 class="feature-title">Analytics</h3>
              <p class="feature-text">Real-time insights and analytics to measure your event's performance.</p>
              <a href="#" class="feature-link">
                Learn more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title text-center">Find the perfect events that match your interests</h2>
        
        <div class="row categories-row">
          <div class="col-lg-3 col-md-6">
            <div class="category-card" style="background-image: url('https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60')">
              <div class="category-overlay"></div>
              <div class="category-content">
                <h3 class="category-title">Corporate</h3>
                <p class="category-count">124 Events</p>
                <router-link to="/events?category=corporate" class="category-link">
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-lg-3 col-md-6">
            <div class="category-card" style="background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60')">
              <div class="category-overlay"></div>
              <div class="category-content">
                <h3 class="category-title">Social</h3>
                <p class="category-count">98 Events</p>
                <router-link to="/events?category=social" class="category-link">
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-lg-3 col-md-6">
            <div class="category-card" style="background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60')">
              <div class="category-overlay"></div>
              <div class="category-content">
                <h3 class="category-title">Tech</h3>
                <p class="category-count">156 Events</p>
                <router-link to="/events?category=tech" class="category-link">
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-lg-3 col-md-6">
            <div class="category-card" style="background-image: url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60')">
              <div class="category-overlay"></div>
              <div class="category-content">
                <h3 class="category-title">Workshops</h3>
                <p class="category-count">87 Events</p>
                <router-link to="/events?category=workshops" class="category-link">
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="row align-items-center">
            <div class="col-lg-8 mb-4 mb-lg-0">
              <h2 class="cta-title">Ready to Create Your Own Event?</h2>
              <p class="cta-text">Join thousands of event organizers who trust EventEase for their event management needs.</p>
            </div>
            <div class="col-lg-4 text-lg-end text-center">
              <router-link to="/register" class="btn btn-light btn-lg">
                Get Started <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No additional script needed
</script>

<style scoped>
/* Base Styles */
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

body {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: var(--text-color);
  background-color: var(--light-color);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.container-fluid {
  width: 100%;
  padding: 0 1.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 1rem;
}

.col-lg-3 {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 1rem;
}

.col-md-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 1rem;
}

.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 1rem;
}

.col-lg-8 {
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  padding: 0 1rem;
}

.col-lg-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 1rem;
}

.text-center {
  text-align: center;
}

.text-lg-end {
  text-align: right;
}

.align-items-center {
  align-items: center;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mb-lg-0 {
  margin-bottom: 0;
}

/* Header Styles */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  background-color: transparent;
  transition: all 0.3s ease;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-icon {
  color: var(--primary-color);
  font-size: 1.75rem;
  margin-right: 0.5rem;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item.active {
  background-color: var(--primary-color);
}

.nav-item:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-toggle i.fa-chevron-down {
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  color: white;
  overflow: hidden;
  padding-top: 4rem;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--dark-color), var(--primary-color));
  z-index: 0;
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.hero-row {
  align-items: center;
  min-height: calc(100vh - 8rem);
}

/* Hero Text Side */
.hero-text-side {
  padding-right: 2rem;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--accent-color);
  border-radius: 50%;
  margin-right: 0.75rem;
  font-size: 0.75rem;
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}

.text-line {
  display: block;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

.btn i {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.btn:hover i {
  transform: translateX(3px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  box-shadow: 0 10px 20px rgba(230, 57, 70, 0.3);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-light {
  background-color: white;
  color: var(--primary-color);
}

.btn-light:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Hero Stats */
.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--accent-color);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 0.8rem;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-top: 0.5rem;
}

/* Hero Visual Side */
.hero-visual-side {
  position: relative;
}

.hero-image-container {
  position: relative;
  height: 500px;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hero-image:hover {
  transform: scale(1.05);
}

/* Floating Elements */
.floating-element {
  position: absolute;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 3;
}

.featured-element {
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  width: 250px;
}

.featured-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  margin-bottom: 0.75rem;
}

.featured-title {
  font-weight: 700;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
}

.featured-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-color);
}

.detail-item i {
  color: var(--primary-color);
}

.rating-element {
  top: 50%;
  right: -20px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  color: var(--accent-color);
  font-size: 0.8rem;
}

.rating-value {
  font-weight: 700;
  color: var(--text-color);
  font-size: 0.85rem;
}

/* Wave Separator */
.wave-separator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 3;
}

.wave-separator svg {
  width: 100%;
  height: 80px;
}

.wave-separator svg path {
  fill: var(--light-color);
}

/* Features Section */
.features-section {
  padding: 5rem 0;
  background-color: var(--light-color);
  position: relative;
  z-index: 4;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.features-row {
  margin-top: 2rem;
}

.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(230, 57, 70, 0.1);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-color);
  margin-bottom: 1rem;
}

.feature-text {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}

.feature-link i {
  transition: transform 0.3s ease;
}

.feature-link:hover i {
  transform: translateX(3px);
}

/* Categories Section */
.categories-section {
  padding: 5rem 0;
  background-color: white;
  position: relative;
  z-index: 4;
}

.categories-row {
  margin-top: 2rem;
}

.category-card {
  height: 280px;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.category-card:hover .category-overlay {
  background: linear-gradient(to top, rgba(230, 57, 70, 0.8), rgba(230, 57, 70, 0.2));
}

.category-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  color: white;
  z-index: 2;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.category-count {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0;
}

.category-link {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.category-card:hover .category-link {
  background: white;
  color: var(--primary-color);
  transform: scale(1.1);
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background-color: var(--light-color);
  position: relative;
  z-index: 4;
}

.cta-card {
  background: linear-gradient(135deg, var(--primary-color), var(--dark-color));
  border-radius: 1rem;
  padding: 3rem;
  color: white;
  box-shadow: 0 15px 40px rgba(230, 57, 70, 0.2);
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-text {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

/* Responsive Adjustments */
@media (max-width: 1199.98px) {
  .hero-title {
    font-size: 3.5rem;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .cta-title {
    font-size: 2rem;
  }
}

@media (max-width: 991.98px) {
  .col-lg-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .col-lg-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .col-lg-8, .col-lg-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .text-lg-end {
    text-align: center;
  }
  .hero-text-side {
    padding-right: 0;
    text-align: center;
    margin-bottom: 3rem;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-stats {
    justify-content: center;
  }
  .hero-image-container {
    height: 400px;
  }
  .cta-card {
    padding: 2rem;
  }
}

@media (max-width: 767.98px) {
  .col-md-4, .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .hero-title {
    font-size: 3rem;
  }
  .hero-subtitle {
    font-size: 1.1rem;
  }
  .hero-stats {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    gap: 0;
  }
  .section-title {
    font-size: 1.5rem;
  }
  .feature-card {
    margin-bottom: 2rem;
  }
  .cta-card {
    padding: 1.5rem;
  }
  .cta-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 575.98px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-actions {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .btn {
    width: 100%;
  }
  .hero-image-container {
    height: 300px;
  }
  .featured-element {
    width: 90%;
  }
  .section-title {
    font-size: 1.3rem;
  }
}
</style>