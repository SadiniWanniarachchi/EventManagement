<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="profile-bg">
          <div class="profile-card" :class="{ 'editing': isEditing }">
            <!-- Profile Header -->
            <div class="profile-header">
              <div class="profile-avatar-container">
                <div class="profile-avatar" @click="isEditing && triggerFileInput">
                  <img 
                    v-if="profileImage" 
                    :src="profileImage" 
                    alt="Profile"
                    class="avatar-image"
                  >
                  <span v-else-if="user?.name" class="avatar-initial">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                  <i v-else class="fas fa-user-circle"></i>
                  <div v-if="isEditing" class="avatar-overlay">
                    <i class="fas fa-camera"></i>
                    <span>Change Photo</span>
                  </div>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="d-none"
                  @change="handleImageUpload"
                >
              </div>
              <div class="profile-info">
                <h2 class="profile-name" v-if="!isEditing">{{ user?.name }}</h2>
                <input
                  v-else
                  v-model="editedName"
                  type="text"
                  class="form-control profile-input"
                  placeholder="Your Name"
                >
                <p class="profile-email">{{ user?.email }}</p>
              </div>
            </div>

            <!-- Profile Stats -->
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{ userStats.posts }}</span>
                <span class="stat-label">Posts</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userStats.likes }}</span>
                <span class="stat-label">Likes</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userStats.comments }}</span>
                <span class="stat-label">Comments</span>
              </div>
            </div>

            <!-- Profile Bio -->
            <div class="profile-bio">
              <h3 class="section-title">About</h3>
              <p v-if="!isEditing" class="bio-text">{{ userBio || 'No bio yet' }}</p>
              <textarea
                v-else
                v-model="editedBio"
                class="form-control bio-input"
                rows="3"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <!-- Profile Actions -->
            <div class="profile-actions">
              <button
                v-if="!isEditing"
                class="btn btn-primary"
                @click="startEditing"
              >
                <i class="fas fa-edit me-2"></i>
                Edit Profile
              </button>
              <div v-else class="action-buttons">
                <button
                  class="btn btn-secondary"
                  @click="cancelEditing"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-primary"
                  @click="saveProfile"
                  :disabled="isSaving"
                >
                  <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
                  Save Changes
                </button>
              </div>
            </div>

            <!-- Navigation -->
            <div class="profile-nav">
              <router-link to="/" class="nav-link">
                <i class="fas fa-home me-2"></i>
                Back to Home
              </router-link>
             
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Cropper Modal -->
    <div v-if="showCropper" class="modal-overlay" @click.self="closeCropper">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Crop Profile Image</h5>
          <button class="btn-close" @click="closeCropper"></button>
        </div>
        <div class="modal-body">
          <div class="cropper-container">
            <img ref="cropperImage" :src="tempImage" alt="Crop preview">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeCropper">Cancel</button>
          <button class="btn btn-primary" @click="cropImage">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const user = authStore.user

// State
const isEditing = ref(false)
const isSaving = ref(false)
const showCropper = ref(false)
const tempImage = ref('')
const profileImage = ref('')
const editedName = ref('')
const editedBio = ref('')
const userBio = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const cropperImage = ref<HTMLImageElement | null>(null)

// Mock user stats (replace with real data from your store)
const userStats = ref({
  posts: 12,
  likes: 48,
  comments: 24
})

// Computed
const isProfileChanged = computed(() => {
  return editedName.value !== user?.name ||
         editedBio.value !== userBio.value ||
         profileImage.value !== ''
})

// Methods
const startEditing = () => {
  editedName.value = user?.name || ''
  editedBio.value = userBio.value
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  editedName.value = user?.name || ''
  editedBio.value = userBio.value
  profileImage.value = ''
}

const saveProfile = async () => {
  isSaving.value = true
  try {
    // Here you would typically make an API call to update the profile
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    
    // Update local state
    if (user) {
      user.name = editedName.value
      userBio.value = editedBio.value
    }
    
    isEditing.value = false
    showSuccessMessage('Profile updated successfully!')
  } catch (error) {
    console.error('Error updating profile:', error)
    showErrorMessage('Failed to update profile. Please try again.')
  } finally {
    isSaving.value = false
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      tempImage.value = e.target?.result as string
      showCropper.value = true
    }
    reader.readAsDataURL(input.files[0])
  }
}

const cropImage = () => {
  if (cropperImage.value) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.width = 300
      canvas.height = 300
      ctx.drawImage(cropperImage.value, 0, 0, 300, 300)
      profileImage.value = canvas.toDataURL('image/jpeg')
    }
    closeCropper()
  }
}

const closeCropper = () => {
  showCropper.value = false
}

const showSuccessMessage = (message: string) => {
  // Implement your preferred notification system
  alert(message)
}

const showErrorMessage = (message: string) => {
  // Implement your preferred notification system
  alert(message)
}

onMounted(() => {
  // Initialize with user data
  if (user) {
    editedName.value = user.name
    userBio.value = 'Vue.js enthusiast and web developer' // Replace with actual user bio
  }
})
</script>

<style scoped>
.profile-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: none;
}

.profile-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.15);
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.profile-card.editing {
  box-shadow: 0 12px 48px rgba(52, 152, 219, 0.25);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.profile-avatar-container {
  position: relative;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-avatar:hover .avatar-overlay {
  opacity: 1;
}

.profile-info {
  text-align: center;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--primary-color);
}

.profile-email {
  color: #666;
  margin-bottom: 0;
  font-size: 1.1rem;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0 1.5rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.profile-bio {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.bio-text {
  color: #666;
  line-height: 1.6;
}

.profile-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.profile-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.nav-link {
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--secondary-color);
}

/* Form Controls */
.profile-input {
  font-size: 1.8rem;
  font-weight: 700;
  padding: 0.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.profile-input:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.bio-input {
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.bio-input:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
}

.modal-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cropper-container {
  max-height: 400px;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 600px) {
  .profile-card {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
  .profile-header {
    gap: 0.5rem;
  }
  .profile-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  .profile-nav {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-card {
  animation: fadeIn 0.5s ease-out;
}

/* Button Styles */
.btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.btn-secondary {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

/* Loading State */
.spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style> 