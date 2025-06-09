<template>
  <div class="container py-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-lg p-4 w-100" style="max-width: 400px;">
      <div class="text-center mb-4">
        <img src="/vite.svg" alt="TaskFlow Logo" width="60" class="mb-2" />
        <h2 class="fw-bold">Log In</h2>
        <p class="text-muted">Access your account</p>
      </div>
      <form @submit.prevent="handleLogin" novalidate :class="{ 'was-validated': validated }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" required autocomplete="email" />
          <div class="invalid-feedback">Valid email is required.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required minlength="6" autocomplete="current-password" />
          <div class="invalid-feedback">Password must be at least 6 characters.</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Log In</button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </form>
      <div class="text-center mt-3">
        <router-link to="/signup" class="small">Don't have an account? Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const validated = ref(false)
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  validated.value = true
  error.value = ''
  if (!email.value || password.value.length < 6) return
  try {
    const { data } = await axios.get('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users', {
      params: { email: email.value, password: password.value }
    })
    if (data.length) {
      auth.login(data[0])
      router.push('/dashboard')
    } else {
      error.value = 'Invalid credentials.'
    }
  } catch (e) {
    error.value = 'Login failed. Try again.'
  }
}
</script>

<style scoped>
.card {
  border-radius: 1.25rem;
}
</style>
