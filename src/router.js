import { createRouter, createWebHistory } from "vue-router";
import LandingView from "./views/LandingView.vue";
import AuthView from "./views/AuthView.vue";
import DashboardView from "./views/DashboardView.vue";
import TaskListView from "./views/TaskListView.vue";
import TaskHistoryView from "./views/TaskHistoryView.vue";
import SettingsView from "./views/SettingsView.vue";
import AnalyticsView from "./views/AnalyticsView.vue";
import { useAuthStore } from "./stores/auth";

const routes = [
  { path: "/", component: LandingView },
  { path: "/signup", component: AuthView },
  { path: "/login", component: AuthView },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  { path: "/tasks", component: TaskListView, meta: { requiresAuth: true } },
  {
    path: "/history",
    component: TaskHistoryView,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    component: AnalyticsView,
    meta: { requiresAuth: true },
  },
  { path: "/settings", component: SettingsView, meta: { requiresAuth: true } },
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
