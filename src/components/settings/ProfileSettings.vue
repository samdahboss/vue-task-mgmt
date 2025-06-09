<template>
  <form @submit.prevent="updateProfile">
    <div class="mb-3">
      <label for="name" class="form-label">Full Name</label>
      <input 
        type="text" 
        class="form-control" 
        id="name" 
        v-model="profileData.name" 
        required
      >
    </div>
    
    <div class="mb-3">
      <label for="email" class="form-label">Email Address</label>
      <input 
        type="email" 
        class="form-control" 
        id="email" 
        v-model="profileData.email" 
        required
      >
    </div>
    
    <hr class="my-4">
    
    <div class="mb-3">
      <label for="currentPassword" class="form-label">Current Password</label>
      <input 
        type="password" 
        class="form-control" 
        id="currentPassword" 
        placeholder="Enter current password to confirm changes"
        v-model="profileData.currentPassword"
      >
    </div>
    
    <div class="mb-3">
      <label for="newPassword" class="form-label">New Password</label>
      <input 
        type="password" 
        class="form-control" 
        id="newPassword" 
        placeholder="Leave blank to keep current password"
        v-model="profileData.newPassword"
      >
      <div class="form-text">Password must be at least 6 characters long</div>
    </div>
    
    <button type="submit" class="btn btn-primary mt-2" :disabled="isSubmitting">
      <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Save Changes
    </button>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update']);

const isSubmitting = ref(false);

const profileData = ref({
  name: props.user.name,
  email: props.user.email,
  currentPassword: '',
  newPassword: ''
});

const updateProfile = async () => {
  isSubmitting.value = true;
  
  try {
    // Basic validation
    if (!profileData.value.name || !profileData.value.email) {
      alert('Name and email are required.');
      return;
    }
    
    // Check if password change is requested
    let updatedData = {
      id: props.user.id,
      name: profileData.value.name,
      email: profileData.value.email
    };
    
    if (profileData.value.newPassword && profileData.value.newPassword.length >= 6) {
      // In a real app, we would validate the current password first
      updatedData.password = profileData.value.newPassword;
    }
    
    // Emit update event with updated data
    emit('update', updatedData);
    
    // Reset password fields
    profileData.value.currentPassword = '';
    profileData.value.newPassword = '';
  } catch (error) {
    console.error('Error in profile update:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
