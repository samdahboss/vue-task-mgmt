<template>
  <form @submit.prevent="handleSignUp" novalidate :class="{ 'was-validated': validated }">
    <div class="form-floating mb-3" data-aos="fade-up" data-aos-delay="100">
      <input
        v-model="name"
        type="text"
        class="form-control rounded-3"
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
        class="form-control rounded-3"
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
        class="form-control rounded-3"
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
      class="btn btn-primary w-100 py-3 rounded-3 fw-semibold"
      data-aos="fade-up"
      data-aos-delay="400"
      :disabled="isLoading"
    >
      <span
        v-if="isLoading"
        class="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      ></span>
      Sign Up
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";
import { useAuthStore } from "../../stores/auth";

// State
const name = ref("");
const email = ref("");
const password = ref("");
const validated = ref(false);
const isLoading = ref(false);
const auth = useAuthStore();

// Define emits
const emit = defineEmits(["signup-success", "error"]);

// Handle signup submission
const handleSignUp = async () => {
  validated.value = true;

  // Form validation
  if (!name.value || !email.value || password.value.length < 6) {
    return;
  }

  isLoading.value = true;

  try {
    // Check if email already exists
    const { data: existingUsers } = await axios.get(
      "https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users",
      {
        params: { email: email.value },
      }
    );

    if (existingUsers.length) {
      emit("error", "Email already exists. Please log in instead.");
      isLoading.value = false;
      return;
    }

    // Create new user
    const { data: newUser } = await axios.post(
      "https://683b92ba28a0b0f2fdc4f63d.mockapi.io/users",
      {
        name: name.value,
        email: email.value,
        password: password.value,
      }
    );

    // Login the new user
    auth.login(newUser);
    emit("signup-success", newUser);
  } catch (e) {
    emit("error", "Registration failed. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
</script>
