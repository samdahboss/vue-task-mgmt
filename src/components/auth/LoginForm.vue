<template>
  <form
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
      :disabled="isLoading"
    >
      <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Log In
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";
import { useAuthStore } from "../../stores/auth";

// State
const email = ref("");
const password = ref("");
const validated = ref(false);
const isLoading = ref(false);
const auth = useAuthStore();

// Define emits
const emit = defineEmits(['login-success', 'error']);

// Handle login submission
const handleLogin = async () => {
  validated.value = true;
  
  // Form validation
  if (!email.value || password.value.length < 6) {
    return;
  }

  isLoading.value = true;
  
  try {
    const { data } = await axios.get(
      "https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users",
      {
        params: { email: email.value, password: password.value },
      }
    );
    
    if (data.length) {
      auth.login(data[0]);
      emit('login-success');
    } else {
      emit('error', 'Invalid credentials.');
    }
  } catch (e) {
    emit('error', 'Login failed. Try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>
