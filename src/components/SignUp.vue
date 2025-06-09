<template>
  <div class="container py-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-lg p-4 w-100" style="max-width: 400px;">
      <div class="text-center mb-4">
        <img src="/vite.svg" alt="TaskFlow Logo" width="60" class="mb-2" />
        <h2 class="fw-bold">Sign Up</h2>
        <p class="text-muted">Create your free account</p>
      </div>
      <form @submit.prevent="handleSignUp" novalidate :class="{ 'was-validated': validated }">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input v-model="name" type="text" class="form-control" id="name" required autocomplete="name" />
          <div class="invalid-feedback">Name is required.</div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" required autocomplete="email" />
          <div class="invalid-feedback">Valid email is required.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required minlength="6" autocomplete="new-password" />
          <div class="invalid-feedback">Password must be at least 6 characters.</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </form>
      <div class="text-center mt-3">
        <router-link to="/login" class="small">Already have an account? Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const validated = ref(false)
const router = useRouter()

const handleSignUp = async () => {
  validated.value = true
  error.value = ''
  if (!name.value || !email.value || password.value.length < 6) return
  try {
    await axios.post('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    router.push('/login')
  } catch (e) {
    error.value = 'Sign up failed. Try again.'
  }
}
</script>

<style scoped>
.card {
  border-radius: 1.25rem;
}
</style>
