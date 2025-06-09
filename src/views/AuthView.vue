<template>
  <div class="auth-container">
    <div class="card-container" data-aos="fade-up" data-aos-duration="1000">
      <div class="card">
        <div class="text-center mb-4">
          <router-link to="/"
            ><img
              src="/vite.svg"
              alt="TaskFlow Logo"
              width="70"
              class="logo-animation mb-3"
            />
          </router-link>
          <h2 class="fw-bold text-gradient">{{ isLogin ? "Log In" : "Sign Up" }}</h2>
          <p class="text-muted">
            {{ isLogin ? "Access your account" : "Create your free account" }}
          </p>
        </div>

        <LoginForm 
          v-if="isLogin" 
          @login-success="onLoginSuccess" 
          @error="error = $event"
        />

        <SignupForm 
          v-else 
          @signup-success="onSignupSuccess" 
          @error="error = $event"
        />

        <!-- Error Display -->
        <div v-if="error" class="alert alert-danger mt-3" data-aos="fade">
          {{ error }}
        </div>

        <!-- Toggle Switch between Login and Signup -->
        <div class="toggle-container mt-4" data-aos="fade-up" data-aos-delay="400">
          <div class="text-center">
            <p class="mb-2">
              {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
            </p>
            <button @click="toggleAuthMode" class="btn btn-link toggle-auth-btn p-0">
              <span class="fw-bold">{{ isLogin ? "Sign Up" : "Log In" }}</span>
            </button>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="decorative-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import LoginForm from "../components/auth/LoginForm.vue";
import SignupForm from "../components/auth/SignupForm.vue";

// Shared state
const error = ref("");
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

// Check if user is already logged in, redirect to dashboard if so
onMounted(() => {
  if (auth.user) {
    router.push('/dashboard');
  }
});

// Determine initial auth mode based on route
const isLogin = ref(route.path === "/login");

// Watch for route changes to update the auth mode
watch(
  () => route.path,
  (newPath) => {
    isLogin.value = newPath === "/login";
    error.value = "";
  }
);

// Toggle between login and signup
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
  error.value = "";
  // Update the URL without triggering a full page refresh
  router.push(
    {
      path: isLogin.value ? "/login" : "/signup",
    },
    { replace: true }
  );
};

// Handle login success
const onLoginSuccess = () => {
  router.push("/dashboard");
};

// Handle signup success
const onSignupSuccess = (userData) => {
  router.push("/dashboard");
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
}

.card-container {
  width: 100%;
  max-width: 450px;
}

.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
}

.text-gradient {
  background: linear-gradient(90deg, #4f46e5, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.custom-input {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
}

.custom-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
}

.auth-btn {
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
}

.toggle-auth-btn {
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.3s;
}

.toggle-auth-btn:hover {
  color: #1e3a8a;
  text-decoration: underline;
}

/* Decorative elements */
.decorative-shapes .shape {
  position: absolute;
  border-radius: 50%;
  z-index: -1;
}

.shape-1 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -75px;
  right: -75px;
  opacity: 0.5;
}

.shape-2 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%);
  bottom: -50px;
  left: -50px;
  opacity: 0.3;
}

.shape-3 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  top: 50%;
  left: -40px;
  opacity: 0.2;
}

/* Dark mode adjustments */
:deep(.dark-theme) .auth-container {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

:deep(.dark-theme) .card {
  background-color: #1e293b;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

:deep(.dark-theme) .text-muted {
  color: #94a3b8 !important;
}

:deep(.dark-theme) .custom-input {
  background-color: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

:deep(.dark-theme) .custom-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-color: #3b82f6;
}
</style>
