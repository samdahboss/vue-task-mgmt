<script setup>
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const auth = useAuthStore()
const theme = useThemeStore()
const router = useRouter()
const isLoggedIn = computed(() => !!auth.user)

// Computed properties for theme-based classes
const navbarClass = computed(() => 
  theme.isDarkTheme ? 'navbar-dark bg-gray-800' : 'navbar-light bg-white shadow-sm'
)

const footerClass = computed(() => 
  theme.isDarkTheme ? 'bg-gray-800' : 'bg-light'
)

const logout = () => {
  auth.logout()
  router.push('/login')
}

onMounted(() => {
  // Initialize theme from localStorage
  theme.initialize()
})
</script>

<template>
  <nav class="navbar navbar-expand-lg" :class="navbarClass">
    <div class="container">
      <router-link class="navbar-brand fw-bold d-flex align-items-center" to="/">
        <img src="/vite.svg" alt="TaskFlow Logo" width="30" height="30" class="me-2" />
        TaskFlow
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link px-3" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link px-3" to="/tasks">Tasks</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link px-3" to="/history">History</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link px-3" to="/add-task">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle me-1" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Add Task
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link px-3" to="/settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear me-1" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
              Settings
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-outline-danger ms-2" @click="logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right me-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              Logout
            </button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link px-3" to="/login">Log In</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link class="btn btn-primary ms-2" to="/signup">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <main>
    <router-view />
  </main>
  
  <footer class="py-4 mt-auto text-center" :class="footerClass">
    <div class="container">
      <p class="mb-0 small text-muted">© {{ new Date().getFullYear() }} TaskFlow. All rights reserved.</p>
    </div>
  </footer>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.navbar {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.nav-link.router-link-active {
  position: relative;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background-color: var(--primary-color);
  border-radius: 2px;
}
</style>
