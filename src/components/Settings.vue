<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h2 class="mb-4 fw-bold">Settings</h2>
            
            <div class="border-bottom pb-4 mb-4">
              <h5 class="mb-3 fw-bold">Appearance</h5>
              <div class="form-check form-switch mb-3">                <input
                  class="form-check-input"
                  type="checkbox"
                  id="themeSwitch"
                  v-model="darkMode"
                />
                <label class="form-check-label" for="themeSwitch">
                  <div class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-moon-stars me-2" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
                      <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
                    </svg>
                    Dark Mode
                  </div>
                </label>
              </div>
            </div>
            
            <div class="pb-4 mb-4">
              <h5 class="mb-3 fw-bold">Notifications</h5>
              <div class="mb-3">
                <label class="form-label d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bell me-2" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                  Notification Preferences
                </label>
                <select v-model="notifications" class="form-select">
                  <option value="enabled">All Notifications</option>
                  <option value="disabled">Disable Notifications</option>
                </select>
                <div class="form-text text-muted">Choose how you want to be notified about task deadlines and updates.</div>
              </div>
            </div>
            
            <div class="d-grid">
              <button class="btn btn-primary" @click="saveSettings">Save Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useThemeStore } from "../stores/theme";

const theme = useThemeStore();
// Use computed with getter and setter for two-way binding with store
const darkMode = computed({
  get: () => theme.isDarkTheme,
  set: () => theme.toggleTheme()
});

const notifications = ref(localStorage.getItem("notifications") || "enabled");

const saveSettings = () => {
  localStorage.setItem("notifications", notifications.value);
  // Show a success message
  alert("Settings saved successfully!");
};

watch(notifications, (val) => {
  localStorage.setItem("notifications", val);
});
</script>
