<template>
  <div>
    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="emailNotifications" v-model="settings.email">
      <label class="form-check-label" for="emailNotifications">Email Notifications</label>
      <div class="form-text">Receive notifications about task updates via email</div>
    </div>
    
    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="pushNotifications" v-model="settings.push">
      <label class="form-check-label" for="pushNotifications">Push Notifications</label>
      <div class="form-text">Receive browser push notifications for important updates</div>
    </div>
    
    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="taskReminders" v-model="settings.reminders">
      <label class="form-check-label" for="taskReminders">Task Reminders</label>
      <div class="form-text">Get reminders about upcoming task deadlines</div>
    </div>
    
    <div class="mt-4">
      <h6 class="mb-3">Notification Frequency</h6>
      <div class="form-check mb-2">
        <input class="form-check-input" type="radio" name="notificationFrequency" id="immediately" v-model="settings.frequency" value="immediately">
        <label class="form-check-label" for="immediately">
          Immediately
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="radio" name="notificationFrequency" id="daily" v-model="settings.frequency" value="daily">
        <label class="form-check-label" for="daily">
          Daily Digest
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="radio" name="notificationFrequency" id="weekly" v-model="settings.frequency" value="weekly">
        <label class="form-check-label" for="weekly">
          Weekly Digest
        </label>
      </div>
    </div>
    
    <button class="btn btn-primary mt-3" @click="saveSettings">Save Notification Settings</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// This would typically come from a store or API
const settings = ref({
  email: true,
  push: true,
  reminders: true,
  frequency: 'immediately'
});

const saveSettings = () => {
  // In a real app, this would save to an API or local storage
  localStorage.setItem('notification-settings', JSON.stringify(settings.value));
  alert('Notification settings saved!');
};

// Load saved settings (if any)
const savedSettings = localStorage.getItem('notification-settings');
if (savedSettings) {
  settings.value = JSON.parse(savedSettings);
}
</script>
