<template>
  <div class="container py-5">
    <h2 class="mb-4">Settings</h2>
    
    <div class="row">
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 mb-4 rounded-4">
          <div class="card-body p-4">
            <h4 class="mb-4 fw-semibold text-secondary">Account Settings</h4>
            <ProfileSettings :user="auth.user" @update="handleProfileUpdate" />
          </div>
        </div>
        
        <div class="card shadow-sm border-0 mb-4 rounded-4">
          <div class="card-body p-4">
            <h4 class="mb-4 fw-semibold text-secondary">Appearance</h4>
            <AppearanceSettings />
          </div>
        </div>
        
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4">
            <h4 class="mb-4 fw-semibold text-secondary">Notifications</h4>
            <NotificationSettings />
          </div>
        </div>
      </div>
      
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 mb-4 rounded-4">
          <div class="card-body p-4">
            <h4 class="mb-4 fw-semibold text-secondary">Account Actions</h4>
            <AccountActions @logout="handleLogout" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import ProfileSettings from '../components/settings/ProfileSettings.vue';
import AppearanceSettings from '../components/settings/AppearanceSettings.vue';
import NotificationSettings from '../components/settings/NotificationSettings.vue';
import AccountActions from '../components/settings/AccountActions.vue';

const auth = useAuthStore();
const router = useRouter();

// Redirect if not logged in
if (!auth.user) {
  router.push('/login');
}

// Handle profile update
const handleProfileUpdate = async (updatedData) => {
  try {
    // Update user profile
    await auth.updateProfile(updatedData);
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile. Please try again.');
  }
};

// Handle logout
const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<style scoped>
.card {
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

/* Dark mode adjustments */
:deep(.dark-theme) .text-secondary {
  color: #e5e7eb !important;
}
</style>
