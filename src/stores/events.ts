import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface EventItem {
  id: number
  title: string
  content: string
  category: string
  date: string
  image?: string
  author: string
  authorId: number
  likes: number
  likedBy: number[]
  createdAt: string
  updatedAt: string
  location: string
  price: number
  capacity: number
  registeredUsers: number[]
  startTime: string
  endTime: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

export const EVENT_CATEGORIES = [
  'Music',
  'Technology',
  'Sports',
  'Arts & Culture',
  'Business',
  'Food & Drink',
  'Education',
  'Health & Wellness',
  'Entertainment',
  'Other'
] as const

// Add dummy data
const DUMMY_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Tech Conference 2024",
    content: "Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities.",
    category: "Technology",
    date: "2024-06-15",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "System",
    authorId: 0, // Special ID for system/dummy events
    likes: 45,
    likedBy: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    location: "Convention Center, New York",
    price: 299.99,
    capacity: 500,
    registeredUsers: [],
    startTime: "09:00",
    endTime: "18:00",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Summer Music Festival",
    content: "A three-day music festival featuring top artists from around the world. Food, drinks, and amazing performances!",
    category: "Music",
    date: "2024-07-20",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "System",
    authorId: 0,
    likes: 78,
    likedBy: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    location: "Central Park, New York",
    price: 149.99,
    capacity: 1000,
    registeredUsers: [],
    startTime: "12:00",
    endTime: "23:00",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Business Networking Mixer",
    content: "Connect with industry leaders and entrepreneurs in this exclusive networking event.",
    category: "Business",
    date: "2024-05-10",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "System",
    authorId: 0,
    likes: 32,
    likedBy: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    location: "Grand Hotel, New York",
    price: 75.00,
    capacity: 200,
    registeredUsers: [],
    startTime: "18:00",
    endTime: "21:00",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Yoga Retreat Weekend",
    content: "A peaceful weekend of yoga, meditation, and wellness activities in nature.",
    category: "Health & Wellness",
    date: "2024-08-05",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "System",
    authorId: 0,
    likes: 56,
    likedBy: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    location: "Mountain Resort, Colorado",
    price: 399.99,
    capacity: 50,
    registeredUsers: [],
    startTime: "08:00",
    endTime: "20:00",
    status: "upcoming"
  },
  {
    id: 5,
    title: "Food & Wine Festival",
    content: "Sample cuisine and wines from top chefs and wineries around the world.",
    category: "Food & Drink",
    date: "2024-09-15",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "System",
    authorId: 0,
    likes: 89,
    likedBy: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    location: "Downtown Square, New York",
    price: 125.00,
    capacity: 300,
    registeredUsers: [],
    startTime: "11:00",
    endTime: "22:00",
    status: "upcoming"
  }
]

export const useEventsStore = defineStore('events', () => {
  // State
  const events = ref<EventItem[]>([])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedDate = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(6)
  const showSuccessMessage = ref(false)
  const successMessage = ref('')

  // Load events from localStorage on store initialization
  const loadEventsFromStorage = () => {
    console.log('Loading events from storage...')
    const storedEvents = localStorage.getItem('events')
    if (storedEvents) {
      console.log('Found stored events:', JSON.parse(storedEvents))
      events.value = JSON.parse(storedEvents)
    } else {
      console.log('No stored events found, initializing with dummy data')
      events.value = [...DUMMY_EVENTS] // Create a new array to avoid reference issues
      saveEventsToStorage()
    }
    console.log('Current events:', events.value)
  }

  // Save events to localStorage
  const saveEventsToStorage = () => {
    console.log('Saving events to storage:', events.value)
    localStorage.setItem('events', JSON.stringify(events.value))
  }

  // Computed properties
  const categories = computed(() => EVENT_CATEGORIES)

  const dates = computed(() => {
    const uniqueDates = new Set(events.value.map(event => event.date))
    return Array.from(uniqueDates).sort()
  })

  const filteredEvents = computed(() => {
    return events.value.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          event.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || event.category === selectedCategory.value
      const matchesDate = !selectedDate.value || event.date === selectedDate.value
      return matchesSearch && matchesCategory && matchesDate
    })
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredEvents.value.length / itemsPerPage.value)
  })

  const paginatedEvents = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredEvents.value.slice(start, end)
  })

  // Actions
  const fetchEvents = async () => {
    console.log('Fetching events...')
    isLoading.value = true
    try {
      loadEventsFromStorage()
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      isLoading.value = false
    }
  }

  const addEvent = async (event: Omit<EventItem, 'id' | 'createdAt' | 'updatedAt' | 'registeredUsers'>) => {
    try {
      const newEvent: EventItem = {
        ...event,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        registeredUsers: []
      }
      events.value.unshift(newEvent)
      saveEventsToStorage()
      showSuccess('Event added successfully!')
      return true
    } catch (error) {
      console.error('Error adding event:', error)
      return false
    }
  }

  const editEvent = async (id: number, updatedEvent: Partial<EventItem>, userId: number) => {
    try {
      const index = events.value.findIndex(event => event.id === id)
      if (index === -1) return false

      const event = events.value[index]
      // Check if it's a dummy event (authorId === 0) or if user is not the author
      if (event.authorId === 0 || event.authorId !== userId) {
        return false
      }

      events.value[index] = {
        ...event,
        ...updatedEvent,
        updatedAt: new Date().toISOString()
      }
      saveEventsToStorage()
      showSuccess('Event updated successfully!')
      return true
    } catch (error) {
      console.error('Error editing event:', error)
      return false
    }
  }

  const deleteEvent = async (id: number, userId: number) => {
    try {
      const index = events.value.findIndex(event => event.id === id)
      if (index === -1) return false

      const event = events.value[index]
      // Check if it's a dummy event (authorId === 0) or if user is not the author
      if (event.authorId === 0 || event.authorId !== userId) {
        return false
      }

      events.value.splice(index, 1)
      saveEventsToStorage()
      showSuccess('Event deleted successfully!')
      return true
    } catch (error) {
      console.error('Error deleting event:', error)
      return false
    }
  }

  const likeEvent = (eventId: number, userId: number) => {
    const event = events.value.find(e => e.id === eventId)
    if (!event) return

    const hasLiked = event.likedBy.includes(userId)
    if (hasLiked) {
      event.likes--
      event.likedBy = event.likedBy.filter(id => id !== userId)
    } else {
      event.likes++
      event.likedBy.push(userId)
    }
    saveEventsToStorage()
  }

  const registerForEvent = (eventId: number, userId: number) => {
    const event = events.value.find(e => e.id === eventId)
    if (!event) return false

    if (event.registeredUsers.length >= event.capacity) {
      showSuccess('Event is already full!')
      return false
    }

    if (event.registeredUsers.includes(userId)) {
      showSuccess('You are already registered for this event!')
      return false
    }

    event.registeredUsers.push(userId)
    saveEventsToStorage()
    showSuccess('Successfully registered for the event!')
    return true
  }

  const unregisterFromEvent = (eventId: number, userId: number) => {
    const event = events.value.find(e => e.id === eventId)
    if (!event) return false

    const index = event.registeredUsers.indexOf(userId)
    if (index === -1) {
      showSuccess('You are not registered for this event!')
      return false
    }

    event.registeredUsers.splice(index, 1)
    saveEventsToStorage()
    showSuccess('Successfully unregistered from the event!')
    return true
  }

  const isUserRegistered = (eventId: number, userId?: number) => {
    if (!userId) return false
    const event = events.value.find(e => e.id === eventId)
    return event?.registeredUsers.includes(userId) || false
  }

  const hasUserLiked = (eventId: number, userId?: number) => {
    if (!userId) return false
    const event = events.value.find(e => e.id === eventId)
    return event?.likedBy.includes(userId) || false
  }

  // UI state management
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1
  }

  const setCategory = (category: string) => {
    selectedCategory.value = category
    currentPage.value = 1
  }

  const setDate = (date: string) => {
    selectedDate.value = date
    currentPage.value = 1
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const showSuccess = (message: string) => {
    successMessage.value = message
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }

  // Initialize store immediately
  loadEventsFromStorage()

  return {
    // State
    events,
    isLoading,
    searchQuery,
    selectedCategory,
    selectedDate,
    currentPage,
    showSuccessMessage,
    successMessage,

    // Computed
    categories,
    dates,
    filteredEvents,
    totalPages,
    paginatedEvents,

    // Actions
    fetchEvents,
    addEvent,
    editEvent,
    deleteEvent,
    likeEvent,
    hasUserLiked,
    registerForEvent,
    unregisterFromEvent,
    isUserRegistered,
    setSearchQuery,
    setCategory,
    setDate,
    setPage
  }
}) 