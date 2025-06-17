<template>
  <div class="events-container">
    <!-- Success Message Toast -->
    <div
      v-if="eventsStore.showSuccessMessage"
      class="success-toast"
      role="alert"
    >
      <div class="success-toast-content">
        <i class="fas fa-check-circle"></i>
        <span>{{ eventsStore.successMessage }}</span>
        <button
          type="button"
          class="toast-close"
          @click="eventsStore.showSuccessMessage = false"
          aria-label="Close success message"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="header-title">Discover Events</h1>
        <p class="header-subtitle">Find and join exciting events happening around you</p>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search events by title, description, or location..."
          @input="handleSearch"
          :value="eventsStore.searchQuery"
          aria-label="Search events"
        >
      </div>
      
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Category</label>
          <div class="filter-select">
            <select
              @change="handleCategoryChange"
              :value="eventsStore.selectedCategory"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              <option
                v-for="category in eventsStore.categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Date</label>
          <div class="filter-select">
            <select
              @change="handleDateChange"
              :value="eventsStore.selectedDate"
              aria-label="Filter by date"
            >
              <option value="">All Dates</option>
              <option
                v-for="date in eventsStore.dates"
                :key="date"
                :value="date"
              >
                {{ formatDate(date) }}
              </option>
            </select>
          </div>
        </div>
        
        <button
          class="add-event-btn"
          @click="showAddEventModal = true"
          v-if="authStore.isAuthenticated"
          aria-label="Add new event"
        >
          <i class="fas fa-plus"></i>
          <span>Create Event</span>
        </button>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="events-grid" v-if="!eventsStore.isLoading && eventsStore.paginatedEvents.length > 0">
      <div
        v-for="event in eventsStore.paginatedEvents"
        :key="event.id"
        class="event-card"
      >
        <div class="event-status" :class="event.status">
          {{ event.status }}
        </div>
        
        <div class="event-image-container">
          <img
            v-if="event.image"
            :src="event.image"
            class="event-image"
            :alt="event.title"
            loading="lazy"
          >
          <div v-else class="event-image-placeholder">
            <i class="fas fa-calendar-alt"></i>
          </div>
        </div>
        
        <div class="event-content">
          <div class="event-header">
            <h3 class="event-title">{{ event.title }}</h3>
            <div class="event-category">{{ event.category }}</div>
          </div>
          
          <p class="event-description">{{ truncateContent(event.content, 120) }}</p>
          
          <div class="event-details">
            <div class="detail-item location">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ event.location }}</span>
            </div>
            <div class="detail-item date">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(event.date) }}</span>
            </div>
            <div class="detail-item time">
              <i class="fas fa-clock"></i>
              <span>{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</span>
            </div>
          </div>
          
          <div class="event-stats">
            <div class="stat-item price">
              <i class="fas fa-ticket-alt"></i>
              <span>{{ event.price === 0 ? 'Free' : `$${event.price}` }}</span>
            </div>
            <div class="stat-item capacity">
              <i class="fas fa-users"></i>
              <span>{{ event.registeredUsers.length }}/{{ event.capacity }}</span>
            </div>
          </div>
          
          <div class="event-actions">
            <button
              class="btn-like"
              @click="handleLike(event.id)"
              :class="{ 'liked': eventsStore.hasUserLiked(event.id, authStore.user?.id) }"
              :aria-pressed="eventsStore.hasUserLiked(event.id, authStore.user?.id)"
              :title="eventsStore.hasUserLiked(event.id, authStore.user?.id) ? 'Unlike' : 'Like'"
            >
              <i class="fas fa-heart"></i>
              <span>{{ event.likes }}</span>
            </button>
            
            <button
              v-if="authStore.isAuthenticated"
              class="btn-register"
              @click="handleRegistration(event)"
              :class="{ 'registered': eventsStore.isUserRegistered(event.id, authStore.user?.id) }"
              :disabled="event.registeredUsers.length >= event.capacity && !eventsStore.isUserRegistered(event.id, authStore.user?.id)"
            >
              <i class="fas" :class="eventsStore.isUserRegistered(event.id, authStore.user?.id) ? 'fa-check' : 'fa-ticket-alt'"></i>
              {{ eventsStore.isUserRegistered(event.id, authStore.user?.id) ? 'Registered' : 'Register' }}
            </button>
            
            <div class="dropdown" v-if="authStore.isAuthenticated && authStore.user?.id === event.authorId">
              <button
                class="btn-actions"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="Open actions menu for this event"
                title="More actions"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    class="dropdown-item"
                    @click="openEditModal(event)"
                  >
                    <i class="fas fa-edit"></i>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item delete-item"
                    @click="handleDeleteEvent(event.id)"
                  >
                    <i class="fas fa-trash"></i>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!eventsStore.isLoading && eventsStore.filteredEvents.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <i class="fas fa-calendar-times"></i>
      </div>
      <h3>No events found</h3>
      <p>Try adjusting your search or filters.</p>
      <button
        class="reset-filters-btn"
        @click="resetFilters"
        v-if="eventsStore.searchQuery || eventsStore.selectedCategory || eventsStore.selectedDate"
      >
        <i class="fas fa-sync-alt"></i> Reset All Filters
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="eventsStore.isLoading" class="loading-state">
      <div class="spinner">
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
      </div>
      <p>Loading events...</p>
    </div>

    <!-- Pagination -->
    <div class="pagination-container" v-if="!eventsStore.isLoading && eventsStore.totalPages > 1">
      <div class="pagination">
        <button
          class="page-btn prev"
          @click="handlePageChange(eventsStore.currentPage - 1)"
          :disabled="eventsStore.currentPage === 1"
          aria-label="Previous page"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          class="page-btn"
          :class="{
            'active': eventsStore.currentPage === page,
            'disabled': page === '...'
          }"
          @click="handlePageChange(page)"
          :disabled="page === '...'"
          :aria-current="eventsStore.currentPage === page ? 'page' : undefined"
          :aria-label="page === '...' ? 'Gap in page numbers' : `Go to page ${page}`"
        >
          {{ page }}
        </button>
        
        <button
          class="page-btn next"
          @click="handlePageChange(eventsStore.currentPage + 1)"
          :disabled="eventsStore.currentPage === eventsStore.totalPages"
          aria-label="Next page"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Add Event Modal -->
    <div v-if="showAddEventModal" class="modal-overlay" @click.self="closeAddModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Create New Event</h2>
          <button
            type="button"
            class="modal-close"
            @click="closeAddModal"
            aria-label="Close add event modal"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddEvent">
            <div class="form-group">
              <label for="eventTitle">Event Title</label>
              <input
                id="eventTitle"
                type="text"
                v-model="newEvent.title"
                placeholder="Enter a descriptive title"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="eventContent">Description</label>
              <textarea
                id="eventContent"
                v-model="newEvent.content"
                rows="4"
                placeholder="Describe your event"
                required
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="eventCategory">Category</label>
                <select
                  id="eventCategory"
                  v-model="newEvent.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option
                    v-for="category in eventsStore.categories"
                    :key="`add-${category}`"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="eventLocation">Location</label>
                <input
                  id="eventLocation"
                  type="text"
                  v-model="newEvent.location"
                  placeholder="Where will it take place?"
                  required
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="eventDate">Date</label>
                <input
                  id="eventDate"
                  type="date"
                  v-model="newEvent.date"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="eventPrice">Price ($)</label>
                <input
                  id="eventPrice"
                  type="number"
                  v-model="newEvent.price"
                  min="0"
                  step="0.01"
                  placeholder="0 for free events"
                  required
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="eventStartTime">Start Time</label>
                <input
                  id="eventStartTime"
                  type="time"
                  v-model="newEvent.startTime"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="eventEndTime">End Time</label>
                <input
                  id="eventEndTime"
                  type="time"
                  v-model="newEvent.endTime"
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="eventCapacity">Capacity</label>
              <input
                id="eventCapacity"
                type="number"
                v-model="newEvent.capacity"
                min="1"
                placeholder="Maximum number of attendees"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="eventImage">Event Image</label>
              <div class="file-input-wrapper">
                <input
                  id="eventImage"
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                >
                <div class="file-input-placeholder">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Upload event image</span>
                </div>
              </div>
              
              <div v-if="newEvent.image" class="image-preview">
                <img :src="newEvent.image" alt="Preview">
                <button type="button" class="remove-image-btn" @click="removeImage">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <div class="modal-actions">
              <button
                type="button"
                class="cancel-btn"
                @click="closeAddModal"
              >
                Cancel
              </button>
              <button type="submit" class="submit-btn">
                <i class="fas fa-plus"></i> Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Event Modal -->
    <div v-if="showEditEventModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Edit Event</h2>
          <button
            type="button"
            class="modal-close"
            @click="closeEditModal"
            aria-label="Close edit event modal"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditEvent">
            <div class="form-group">
              <label for="editTitle">Event Title</label>
              <input
                id="editTitle"
                type="text"
                v-model="editEvent.title"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="editContent">Description</label>
              <textarea
                id="editContent"
                v-model="editEvent.content"
                rows="4"
                required
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="editCategory">Category</label>
                <select
                  id="editCategory"
                  v-model="editEvent.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option
                    v-for="category in eventsStore.categories"
                    :key="`edit-${category}`"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="editLocation">Location</label>
                <input
                  id="editLocation"
                  type="text"
                  v-model="editEvent.location"
                  required
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="editDate">Date</label>
                <input
                  id="editDate"
                  type="date"
                  v-model="editEvent.date"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="editPrice">Price ($)</label>
                <input
                  id="editPrice"
                  type="number"
                  v-model="editEvent.price"
                  min="0"
                  step="0.01"
                  required
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="editStartTime">Start Time</label>
                <input
                  id="editStartTime"
                  type="time"
                  v-model="editEvent.startTime"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="editEndTime">End Time</label>
                <input
                  id="editEndTime"
                  type="time"
                  v-model="editEvent.endTime"
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="editCapacity">Capacity</label>
              <input
                id="editCapacity"
                type="number"
                v-model="editEvent.capacity"
                min="1"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="editImage">Event Image</label>
              <div class="file-input-wrapper">
                <input
                  id="editImage"
                  type="file"
                  @change="handleEditImageUpload"
                  accept="image/*"
                >
                <div class="file-input-placeholder">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Change event image</span>
                </div>
              </div>
              
              <div v-if="editEvent.image" class="image-preview">
                <img :src="editEvent.image" alt="Preview">
                <button type="button" class="remove-image-btn" @click="removeEditImage">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <div class="modal-actions">
              <button
                type="button"
                class="cancel-btn"
                @click="closeEditModal"
              >
                Cancel
              </button>
              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEventsStore } from '../stores/events'
import { useAuthStore } from '../stores/auth'
import type { EventItem } from '../stores/events'

const eventsStore = useEventsStore()
const authStore = useAuthStore()

const showAddEventModal = ref(false)
const showEditEventModal = ref(false)
const selectedEvent = ref<EventItem | null>(null)

interface EventForm {
  title: string
  content: string
  category: string
  date: string
  image?: string
  location: string
  price: number
  capacity: number
  startTime: string
  endTime: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

const newEvent = ref<EventForm>({
  title: '',
  content: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  image: undefined,
  location: '',
  price: 0,
  capacity: 1,
  startTime: '09:00',
  endTime: '17:00',
  status: 'upcoming'
})

const editEvent = ref<EventForm>({
  title: '',
  content: '',
  category: '',
  date: '',
  image: undefined,
  location: '',
  price: 0,
  capacity: 1,
  startTime: '',
  endTime: '',
  status: 'upcoming'
})

const visiblePages = computed(() => {
  const current = eventsStore.currentPage
  const total = eventsStore.totalPages
  const maxVisibleButtons = 5
  const sideButtons = Math.floor((maxVisibleButtons - 3) / 2)

  if (total <= maxVisibleButtons + 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = [1]

  if (current > sideButtons + 2) {
    pages.push('...')
  }

  let startPage = Math.max(2, current - sideButtons)
  let endPage = Math.min(total - 1, current + sideButtons)

  if (current <= sideButtons + 1) {
    endPage = Math.min(total - 1, maxVisibleButtons - 1)
  }
  if (current >= total - sideButtons) {
    startPage = Math.max(2, total - (maxVisibleButtons - 2))
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (current < total - sideButtons - 1) {
    pages.push('...')
  }

  pages.push(total)
  return pages
})

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  eventsStore.setSearchQuery(target.value)
}

const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  eventsStore.setCategory(target.value)
}

const handleDateChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  eventsStore.setDate(target.value)
}

const handlePageChange = (page: number | string) => {
  if (typeof page !== 'number' || page < 1 || page > eventsStore.totalPages) return
  eventsStore.setPage(page as number)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetFilters = () => {
  eventsStore.setSearchQuery('')
  eventsStore.setCategory('')
  eventsStore.setDate('')
  eventsStore.setPage(1)
}

const handleLike = (id: number) => {
  if (!authStore.user) {
    alert('Please login to like events.')
    return
  }
  eventsStore.likeEvent(id, authStore.user.id)
}

const handleAddEvent = async () => {
  if (!authStore.isAuthenticated || !authStore.user) {
    alert('Please login to add events.')
    return
  }

  if (!newEvent.value.title.trim() || !newEvent.value.content.trim() || !newEvent.value.category || !newEvent.value.date) {
    alert('Please fill in all required fields (Title, Description, Category, Date).')
    return
  }

  try {
    const success = await eventsStore.addEvent({
      ...newEvent.value,
      author: authStore.user.name,
      authorId: authStore.user.id,
      likes: 0,
      likedBy: []
    })
    
    if (success) {
      closeAddModal()
    } else {
      alert('Failed to add event. Please try again.')
    }
  } catch (error) {
    console.error("Error adding event:", error)
    alert("Failed to add event. Please try again.")
  }
}

const handleEditEvent = async () => {
  if (!authStore.isAuthenticated || !authStore.user || !selectedEvent.value) {
    alert('Authentication error or no event selected. Please try again.')
    return
  }

  if (!editEvent.value.title.trim() || !editEvent.value.content.trim() || !editEvent.value.category || !editEvent.value.date) {
    alert('Please fill in all required fields (Title, Description, Category, Date).')
    return
  }

  try {
    const success = await eventsStore.editEvent(selectedEvent.value.id, {
      ...editEvent.value
    }, authStore.user.id)

    if (success) {
      closeEditModal()
    } else {
      alert('You can only edit your own events or an error occurred!')
    }
  } catch (error) {
    console.error("Error editing event:", error)
    alert("Failed to edit event. Please try again.")
  }
}

const handleDeleteEvent = async (id: number) => {
  if (!authStore.isAuthenticated || !authStore.user) {
    alert('Please login to delete events.')
    return
  }

  if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
    try {
      const success = await eventsStore.deleteEvent(id, authStore.user.id)
      if (!success) {
        alert('You can only delete your own events or an error occurred!')
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Failed to delete event. Please try again.")
    }
  }
}

const openEditModal = (event: EventItem) => {
  if (!authStore.isAuthenticated || !authStore.user) {
    alert('Please login to edit events.')
    return
  }
  if (event.authorId !== authStore.user.id) {
    alert('You can only edit your own events!')
    return
  }

  selectedEvent.value = event
  editEvent.value = {
    title: event.title,
    content: event.content,
    category: event.category,
    date: event.date,
    image: event.image,
    location: event.location,
    price: event.price,
    capacity: event.capacity,
    startTime: event.startTime,
    endTime: event.endTime,
    status: event.status
  }
  showEditEventModal.value = true
}

const truncateContent = (text: string, length: number) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  try {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  } catch (e) {
    return dateString
  }
}

const formatTime = (time: string) => {
  if (!time) return 'N/A'
  try {
    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  } catch (e) {
    return time
  }
}

const resetNewEventForm = () => {
  newEvent.value = {
    title: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    image: undefined,
    location: '',
    price: 0,
    capacity: 1,
    startTime: '09:00',
    endTime: '17:00',
    status: 'upcoming'
  }
}

const resetEditEventForm = () => {
  editEvent.value = {
    title: '',
    content: '',
    category: '',
    date: '',
    image: undefined,
    location: '',
    price: 0,
    capacity: 1,
    startTime: '',
    endTime: '',
    status: 'upcoming'
  }
  selectedEvent.value = null
}

const closeAddModal = () => {
  showAddEventModal.value = false
  resetNewEventForm()
}

const closeEditModal = () => {
  showEditEventModal.value = false
  resetEditEventForm()
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      newEvent.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleEditImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      editEvent.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  newEvent.value.image = undefined
}

const removeEditImage = () => {
  editEvent.value.image = undefined
}

const handleRegistration = (event: EventItem) => {
  if (!authStore.user) {
    alert('Please login to register for events.')
    return
  }

  if (eventsStore.isUserRegistered(event.id, authStore.user.id)) {
    eventsStore.unregisterFromEvent(event.id, authStore.user.id)
  } else {
    eventsStore.registerForEvent(event.id, authStore.user.id)
  }
}

let clickOutsideHandler: ((event: MouseEvent) => void) | null = null

onMounted(() => {
  eventsStore.setCategory(''); // Reset to show all events by default
  eventsStore.fetchEvents()

  clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (showAddEventModal.value && target.classList.contains('modal-overlay')) {
      closeAddModal()
    }
    if (showEditEventModal.value && target.classList.contains('modal-overlay')) {
      closeEditModal()
    }
  }
  document.addEventListener('click', clickOutsideHandler)
})

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler)
  }
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
  --background-color: #f8f9fa;   /* Light Gray Background */
  --border-radius: 12px;
  --box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Main Container */
.events-container {
  min-height: 100vh;
  background-color: var(--background-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

/* Header Section */
.header-section {
  padding: 60px 0 40px;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.header-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.header-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

/* Search and Filter Section */
.search-filter-section {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.search-box {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.search-box i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  font-size: 18px;
}

.search-box input {
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  font-size: 16px;
  background-color: white;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  color: var(--text-color);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(230, 57, 70, 0.15);
}

.filters-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
  max-width: 300px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
  padding-left: 4px;
}

.filter-select {
  position: relative;
}

.filter-select select {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  font-size: 16px;
  color: var(--text-color);
  background-color: white;
  box-shadow: var(--box-shadow);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23e63946' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  transition: all 0.3s ease;
}

.filter-select select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(230, 57, 70, 0.15);
}

.add-event-btn {
  padding: 14px 24px;
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--box-shadow);
}

.add-event-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(230, 57, 70, 0.2);
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.event-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.event-status {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.event-status.upcoming {
  background-color: var(--primary-color);
  color: white;
}

.event-status.ongoing {
  background-color: #10b981;
  color: white;
}

.event-status.completed {
  background-color: var(--text-light);
  color: white;
}

.event-image-container {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.event-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--light-color), #ffebef);
}

.event-image-placeholder i {
  font-size: 48px;
  color: var(--primary-color);
}

.event-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
}

.event-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-title {
  color: var(--text-color);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 52px;
}

.event-category {
  align-self: flex-start;
  background-color: var(--light-color);
  color: var(--text-color);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.event-description {
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 76px;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  color: var(--text-color);
}

.detail-item {
  display: flex;
  align-items: center;
  color: var(--text-color);
  font-size: 15px;
}

.detail-item i {
  color: var(--text-color);
  margin-right: 12px;
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.event-stats {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  color: var(--text-color);
}

.stat-item {
  display: flex;
  align-items: center;
  color: var(--text-color);
  font-size: 15px;
  font-weight: 600;
}

.stat-item i {
  color: var(--text-color);
  margin-right: 8px;
  font-size: 16px;
}

.event-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.btn-like, .btn-register, .btn-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-like {
  background-color: var(--light-color);
  color: var(--primary-color);
}

.btn-like:hover {
  background-color: var(--secondary-color);
  color: white;
}

.btn-like.liked {
  background-color: var(--primary-color);
  color: white;
}

.btn-register {
  background-color: var(--light-color);
  color: var(--primary-color);
  padding: 10px 20px;
}

.btn-register:hover:not(:disabled) {
  background-color: var(--accent-color);
  color: white;
}

.btn-register.registered {
  background-color: var(--primary-color);
  color: white;
}

.btn-register:disabled {
  background-color: #f0f0f0;
  color: var(--text-light);
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-actions {
  background-color: var(--light-color);
  color: var(--text-color);
  padding: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.btn-actions:hover {
  background-color: var(--secondary-color);
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  z-index: 1000;
  padding: 8px 0;
  margin-top: 8px;
  list-style: none;
  display: none;
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--text-color);
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-color);
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 15px;
  color: var(--text-color);
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.delete-item {
  color: var(--primary-color);
}

.dropdown-item.delete-item:hover {
  background-color: #fff0f0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 24px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  max-width: 600px;
  margin: 0 auto 60px;
}

.empty-state-icon {
  font-size: 60px;
  color: var(--text-light);
  margin-bottom: 24px;
}

.empty-state h3 {
  color: var(--text-color);
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 700;
}

.empty-state p {
  color: var(--text-light);
  margin-bottom: 24px;
  font-size: 16px;
}

.reset-filters-btn {
  background-color: var(--light-color);
  color: var(--primary-color);
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.reset-filters-btn:hover {
  background-color: var(--secondary-color);
  color: white;
  transform: translateY(-2px);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 60px 24px;
  max-width: 600px;
  margin: 0 auto;
}

.spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.spinner svg {
  animation: rotate 2s linear infinite;
  height: 100%;
  width: 100%;
}

.spinner circle {
  stroke: var(--primary-color);
  stroke-width: 5;
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  stroke-linecap: round;
  fill: none;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -125;
  }
}

.loading-state p {
  color: var(--text-color);
  font-size: 18px;
  font-weight: 500;
}

/* Pagination */
.pagination-container {
  margin: 40px 0 20px;
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(.active):not(.disabled) {
  background-color: var(--light-color);
  color: var(--primary-color);
  border-color: var(--secondary-color);
}

.page-btn.active {
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  border-color: var(--primary-color);
}

.page-btn.disabled {
  color: var(--text-light);
  cursor: not-allowed;
  opacity: 0.6;
}

.page-btn.prev, .page-btn.next {
  padding: 0 16px;
}

/* Success Toast */
.success-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  background-color: #c2c8c6;
  color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  max-width: 90%;
  animation: slideDown 0.3s ease-out;
}

.success-toast-content {
  display: flex;
  align-items: center;
  padding: 16px 24px;
}

.success-toast-content i {
  margin-right: 12px;
  font-size: 20px;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  margin-left: 16px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes slideDown {
  from { transform: translate(-50%, -20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  padding: 24px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-close:hover {
  color: var(--primary-color);
  background-color: var(--light-color);
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 24px;
  
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 0;
}

.form-group label {
  display: block;
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 16px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  color: var(--text-color);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
  outline: none;
  background-color: white;
}

.file-input-wrapper {
  position: relative;
  overflow: hidden;
}

.file-input-wrapper input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

.file-input-placeholder {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px dashed #e0e0e0;
  border-radius: var(--border-radius);
  color: var(--text-light);
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  justify-content: center;
}

.file-input-wrapper:hover .file-input-placeholder {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background-color: var(--light-color);
}

.image-preview {
  margin-top: 16px;
  position: relative;
  display: inline-block;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: var(--border-radius);
  border: 1px solid #e0e0e0;
}

.remove-image-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.remove-image-btn:hover {
  background-color: var(--primary-dark);
  transform: scale(1.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

.cancel-btn, .submit-btn {
  padding: 14px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: var(--text-color);
  border: none;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(230, 57, 70, 0.2);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(230, 57, 70, 0.3);
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .events-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .header-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .events-container {
    padding: 0 16px 40px;
  }
  
  .header-section {
    padding: 40px 0 30px;
    margin-bottom: 30px;
  }
  
  .header-title {
    font-size: 2rem;
  }
  
  .header-subtitle {
    font-size: 1.1rem;
  }
  
  .search-filter-section {
    margin-bottom: 30px;
  }
  
  .events-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
}

@media (max-width: 576px) {
  .events-container {
    padding: 0 12px 30px;
  }
  
  .header-section {
    padding: 30px 0 24px;
    margin-bottom: 24px;
  }
  
  .header-title {
    font-size: 1.75rem;
  }
  
  .header-subtitle {
    font-size: 1rem;
  }
  
  .search-box input {
    padding: 14px 16px 14px 45px;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .event-image-container {
    height: 180px;
  }
  
  .event-content {
    padding: 20px;
    gap: 12px;
  }
  
  .event-title {
    font-size: 18px;
    min-height: 46px;
  }
  
  .event-description {
    font-size: 15px;
    min-height: 72px;
  }
  
  .detail-item, .stat-item {
    font-size: 14px;
  }
  
  .btn-like, .btn-register {
    padding: 8px 12px;
    font-size: 14px;
  }
  
  .modal-header, .modal-body {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 15px;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px 14px;
    font-size: 15px;
  }
}
</style>