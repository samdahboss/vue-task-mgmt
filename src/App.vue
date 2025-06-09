<script setup>
import { useAuthStore } from "./stores/auth";
import { useThemeStore } from "./stores/theme";
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";

const auth = useAuthStore();
const theme = useThemeStore();
const router = useRouter();
const route = useRoute();
const isLoggedIn = computed(() => !!auth.user);
const isSidebarCollapsed = ref(false);

// Check if the current route is an authentication page (login or signup)
const isAuthPage = computed(() => {
  return route.path === "/login" || route.path === "/signup";
});

// Computed properties for theme-based classes
const navbarClass = computed(() =>
  theme.isDarkTheme ? "navbar-dark bg-gray-800" : "navbar-light bg-white shadow-sm"
);

const sidebarClass = computed(() =>
  theme.isDarkTheme ? "bg-gray-900 text-light" : "bg-light"
);

const contentClass = computed(() => (theme.isDarkTheme ? "bg-gray-800" : "bg-white"));

const footerClass = computed(() => (theme.isDarkTheme ? "bg-gray-800" : "bg-light"));

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const logout = () => {
  auth.logout();
  router.push("/login");
};

onMounted(() => {
  // Initialize theme from localStorage
  theme.initialize();
});
</script>

<template>
  <div class="dashboard-layout" v-if="isLoggedIn">
    <!-- Sidebar -->
    <div :class="['sidebar', sidebarClass, { collapsed: isSidebarCollapsed }]">
      <div class="sidebar-header p-3 d-flex align-items-center justify-content-between">
        <router-link
          class="sidebar-brand text-decoration-none d-flex align-items-center"
          to="/"
        >
          <img src="/vite.svg" alt="TaskFlow Logo" width="30" height="30" class="me-2" />
          <span class="fw-bold" v-if="!isSidebarCollapsed">TaskFlow</span>
        </router-link>
        <button
          class="btn btn-link p-0 d-none d-md-block sidebar-toggle"
          @click="toggleSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi"
            :class="isSidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
      </div>

      <div class="sidebar-nav p-2">
        <div class="nav-item my-1">
          <router-link
            class="nav-link px-3 py-2 rounded d-flex align-items-center"
            to="/dashboard"
            data-title="Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-speedometer2 me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"
              />
              <path
                fill-rule="evenodd"
                d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
              />
            </svg>
            <span v-if="!isSidebarCollapsed">Dashboard</span>
          </router-link>
        </div>

        <div class="nav-item my-1">
          <router-link
            class="nav-link px-3 py-2 rounded d-flex align-items-center"
            to="/tasks"
            data-title="Tasks"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-list-task me-2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
              />
              <path
                d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"
              />
              <path
                fill-rule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
              />
            </svg>
            <span v-if="!isSidebarCollapsed">Tasks</span>
          </router-link>
        </div>

        <div class="nav-item my-1">
          <router-link
            class="nav-link px-3 py-2 rounded d-flex align-items-center"
            to="/history"
            data-title="History"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-clock-history me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
              />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
              <path
                d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            <span v-if="!isSidebarCollapsed">History</span>
          </router-link>
        </div>

        <div class="nav-item my-1">
          <router-link
            class="nav-link px-3 py-2 rounded d-flex align-items-center"
            to="/analytics"
            data-title="Analytics"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-bar-chart-line me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"
              />
            </svg>
            <span v-if="!isSidebarCollapsed">Analytics</span>
          </router-link>
        </div>

        <div class="nav-item my-1">
          <router-link
            class="nav-link px-3 py-2 rounded d-flex align-items-center"
            to="/settings"
            data-title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-gear me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
              />
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
              />
            </svg>
            <span v-if="!isSidebarCollapsed">Settings</span>
          </router-link>
        </div>

        <div class="nav-item my-1 mt-4">
          <button
            class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center position-relative"
            @click="logout"
            data-title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-box-arrow-right me-2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            <span v-if="!isSidebarCollapsed">Logout</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="content-wrapper">
      <!-- Mobile header -->
      <div
        class="mobile-header d-flex d-md-none align-items-center p-3"
        :class="navbarClass"
      >
        <button class="btn btn-link text-decoration-none p-1 me-3" @click="toggleSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <router-link class="text-decoration-none d-flex align-items-center" to="/">
          <img src="/vite.svg" alt="TaskFlow Logo" width="30" height="30" class="me-2" />
          <span class="fw-bold">TaskFlow</span>
        </router-link>
      </div>

      <main :class="contentClass">
        <router-view />
      </main>

      <footer class="py-4 mt-auto text-center" :class="footerClass">
        <div class="container">
          <p class="mb-0 small text-muted">
            © {{ new Date().getFullYear() }} TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </div>

  <!-- Public layout (for non-authenticated users) -->
  <div v-else>
    <!-- Show navbar and footer only on landing page, not on login or signup -->
    <template v-if="!isAuthPage">
      <nav class="navbar navbar-expand-lg" :class="navbarClass">
        <div class="container">
          <router-link class="navbar-brand fw-bold d-flex align-items-center" to="/">
            <img
              src="/vite.svg"
              alt="TaskFlow Logo"
              width="30"
              height="30"
              class="me-2"
            />
            TaskFlow
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
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-center">
              <li class="nav-item">
                <router-link class="nav-link px-3" to="/login">Log In</router-link>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-primary ms-2" to="/signup"
                  >Sign Up</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </template>

    <main>
      <router-view />
    </main>

    <template v-if="!isAuthPage">
      <footer class="py-4 mt-auto text-center" :class="footerClass">
        <div class="container">
          <p class="mb-0 small text-muted">
            © {{ new Date().getFullYear() }} TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </template>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: all 0.3s;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar.collapsed .sidebar-nav .nav-link svg {
  margin-right: 0 !important;
}

.sidebar.collapsed .sidebar-brand span,
.sidebar.collapsed .nav-link span {
  display: none;
}

.sidebar-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.sidebar-nav .nav-link {
  transition: all 0.2s;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav .nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-theme .sidebar-nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-nav .nav-link.router-link-active {
  background-color: var(--primary-color);
  color: white !important;
}

.sidebar-nav .nav-link.router-link-active svg {
  color: white !important;
}

/* For collapsed sidebar - show icons in active state */
.sidebar.collapsed .nav-link.router-link-active {
  background-color: var(--primary-color);
  color: white !important;
  display: flex;
  justify-content: center;
}

/* Tooltip for collapsed sidebar */
.sidebar.collapsed .nav-link {
  position: relative;
  display: flex;
  justify-content: center;
}

.sidebar.collapsed .nav-link::after {
  content: attr(data-title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--gray-800);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 1000;
  margin-left: 10px;
}

.sidebar.collapsed .nav-link:hover::after {
  opacity: 1;
}

/* Content area */
.content-wrapper {
  flex: 1;
  margin-left: 250px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-layout:has(.sidebar.collapsed) .content-wrapper {
  margin-left: 70px;
}

main {
  flex: 1;
}

/* Mobile adaptations */
@media (max-width: 767.98px) {
  .sidebar {
    transform: translateX(-100%);
    width: 250px !important;
  }

  .sidebar.collapsed {
    transform: translateX(0);
  }

  .content-wrapper {
    margin-left: 0 !important;
  }

  .mobile-header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.navbar {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
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

.bg-gray-800 {
  background-color: #343a40;
}

.bg-gray-900 {
  background-color: #212529;
}
</style>
