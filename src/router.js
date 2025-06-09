import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./components/LandingPage.vue";
import AuthPage from "./components/AuthPage.vue";
import Dashboard from "./components/Dashboard.vue";
import TaskList from "./components/TaskList.vue";
import TaskHistory from "./components/TaskHistory.vue";
import Settings from "./components/Settings.vue";
import Analytics from "./components/Analytics.vue";
import { useAuthStore } from "./stores/auth";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/signup", component: AuthPage },
  { path: "/login", component: AuthPage },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/tasks", component: TaskList, meta: { requiresAuth: true } },
  { path: "/history", component: TaskHistory, meta: { requiresAuth: true } },
  { path: "/analytics", component: Analytics, meta: { requiresAuth: true } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for auth-protected routes and redirecting authenticated users
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isLoggedIn = !!auth.user;

  // If route requires authentication and user is not logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  }
  // If user is already logged in and tries to access login/signup pages or landing page
  else if (
    isLoggedIn &&
    (to.path === "/login" || to.path === "/signup" || to.path === "/")
  ) {
    next("/dashboard"); // Redirect to dashboard
  }
  // Otherwise proceed as normal
  else {
    next();
  }
});

export default router;
