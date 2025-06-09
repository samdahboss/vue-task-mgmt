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

        <!-- Login Form -->
        <form
          v-if="isLogin"
          @submit.prevent="handleLogin"
          novalidate
          :class="{ 'was-validated': validated }"
        >
          <div class="form-floating mb-3" data-aos="fade-up" data-aos-delay="100">
            <input
              v-model="email"
              type="email"
              class="form-control custom-input"
              id="email"
              required
              autocomplete="email"
              placeholder="name@example.com"
            />
            <label for="email">Email</label>
            <div class="invalid-feedback">Valid email is required.</div>
          </div>
          <div class="form-floating mb-4" data-aos="fade-up" data-aos-delay="200">
            <input
              v-model="password"
              type="password"
              class="form-control custom-input"
              id="password"
              required
              minlength="6"
              autocomplete="current-password"
              placeholder="Password"
            />
            <label for="password">Password</label>
            <div class="invalid-feedback">Password must be at least 6 characters.</div>
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100 py-3 auth-btn"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Log In
          </button>
          <div v-if="error" class="alert alert-danger mt-3" data-aos="fade">
            {{ error }}
          </div>
        </form>

        <!-- Signup Form -->
        <form
          v-else
          @submit.prevent="handleSignUp"
          novalidate
          :class="{ 'was-validated': validated }"
        >
          <div class="form-floating mb-3" data-aos="fade-up" data-aos-delay="100">
            <input
              v-model="name"
              type="text"
              class="form-control custom-input"
              id="name"
              required
              autocomplete="name"
              placeholder="Your name"
            />
            <label for="name">Name</label>
            <div class="invalid-feedback">Name is required.</div>
          </div>
          <div class="form-floating mb-3" data-aos="fade-up" data-aos-delay="200">
            <input
              v-model="email"
              type="email"
              class="form-control custom-input"
              id="email"
              required
              autocomplete="email"
              placeholder="name@example.com"
            />
            <label for="email">Email</label>
            <div class="invalid-feedback">Valid email is required.</div>
          </div>
          <div class="form-floating mb-4" data-aos="fade-up" data-aos-delay="300">
            <input
              v-model="password"
              type="password"
              class="form-control custom-input"
              id="password"
              required
              minlength="6"
              autocomplete="new-password"
              placeholder="Password"
            />
            <label for="password">Password</label>
            <div class="invalid-feedback">Password must be at least 6 characters.</div>
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100 py-3 auth-btn"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Sign Up
          </button>
          <div v-if="error" class="alert alert-danger mt-3" data-aos="fade">
            {{ error }}
          </div>
        </form>

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
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Shared state
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const validated = ref(false);
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
    resetForm();
  }
);

// Toggle between login and signup
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
  resetForm();
  // Update the URL without triggering a full page refresh
  router.push(
    {
      path: isLogin.value ? "/login" : "/signup",
    },
    { replace: true }
  );
};

// Reset form state when switching between login and signup
const resetForm = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  error.value = "";
  validated.value = false;
};

// Handle login submission
const handleLogin = async () => {
  validated.value = true;
  error.value = "";
  if (!email.value || password.value.length < 6) return;

  // Add loading state effect
  const btn = document.querySelector(".auth-btn");
  btn.disabled = true;
  btn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Logging in...';

  try {
    const { data } = await axios.get(
      "https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users",
      {
        params: { email: email.value, password: password.value },
      }
    );
    if (data.length) {
      auth.login(data[0]);
      router.push("/dashboard");
    } else {
      error.value = "Invalid credentials.";
      btn.disabled = false;
      btn.innerHTML = "Log In";
    }
  } catch (e) {
    error.value = "Login failed. Try again.";
    btn.disabled = false;
    btn.innerHTML = "Log In";
  }
};

// Handle signup submission
const handleSignUp = async () => {
  validated.value = true;
  error.value = "";
  if (!name.value || !email.value || password.value.length < 6) return;

  // Add loading state effect
  const btn = document.querySelector(".auth-btn");
  btn.disabled = true;
  btn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Signing up...';

  try {
    await axios.post("https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    // Switch to login after successful signup
    isLogin.value = true;
    resetForm();
    router.push("/login");
    error.value = "Account created! Please log in.";
    btn.disabled = false;
    btn.innerHTML = "Log In";
  } catch (e) {
    error.value = "Sign up failed. Try again.";
    btn.disabled = false;
    btn.innerHTML = "Sign Up";
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.card-container {
  width: 100%;
  max-width: 450px;
  perspective: 1000px;
}

.card {
  border: none;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 30px 60px rgba(79, 70, 229, 0.1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 40px 70px rgba(79, 70, 229, 0.15);
}

.text-gradient {
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.logo-animation {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.custom-input {
  border: 1px solid var(--gray-300);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
}

.custom-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(79, 70, 229, 0.25);
  background-color: white;
  transform: translateY(-2px);
}

.form-floating label {
  padding: 0.75rem 1rem;
}

.form-floating > .form-control:focus ~ label {
  color: var(--primary-color);
}

.auth-btn {
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  border: none;
  position: relative;
  overflow: hidden;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
}

.auth-btn:active {
  transform: translateY(0);
}

.toggle-container {
  position: relative;
  z-index: 10;
}

.toggle-auth-btn {
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  position: relative;
}

.toggle-auth-btn::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 50%;
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  transition: all 0.3s ease;
}

.toggle-auth-btn:hover::after {
  width: 100%;
  left: 0;
}

/* Decorative elements */
.decorative-shapes .shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  z-index: 0;
}

.shape-1 {
  top: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  animation: float1 10s ease-in-out infinite;
}

.shape-2 {
  bottom: -20px;
  left: -20px;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
  animation: float2 12s ease-in-out infinite;
}

.shape-3 {
  top: 50%;
  right: -15px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  animation: float3 8s ease-in-out infinite;
}

@keyframes float1 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-15px, 15px) rotate(10deg);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(15px, -10px) rotate(-10deg);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-10px, -15px) rotate(15deg);
  }
}

/* Form transition animations */
form {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .card {
    padding: 1.5rem;
  }
}
</style>
