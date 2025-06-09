import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./components/LandingPage.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";
import TaskHistory from "./components/TaskHistory.vue";
import Settings from "./components/Settings.vue";
import Analytics from "./components/Analytics.vue";
import { useAuthStore } from "./stores/auth";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/add-task", component: AddTask, meta: { requiresAuth: true } },
  { path: "/tasks", component: TaskList, meta: { requiresAuth: true } },
  { path: "/history", component: TaskHistory, meta: { requiresAuth: true } },
  { path: "/analytics", component: Analytics, meta: { requiresAuth: true } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for auth-protected routes
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
