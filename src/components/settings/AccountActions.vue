<template>
  <div>
    <div class="mb-4">
      <h6 class="mb-3">Export Data</h6>
      <button class="btn btn-outline-primary w-100 mb-2" @click="exportData">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download me-2" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
        Export All Tasks
      </button>
    </div>
    
    <div class="mb-4">
      <h6 class="mb-3">Danger Zone</h6>
      <button class="btn btn-outline-danger w-100 mb-2" @click="confirmDeleteAccount">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash me-2" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
        Delete Account
      </button>
      
      <button class="btn btn-outline-secondary w-100" @click="$emit('logout')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        Logout
      </button>
    </div>
    
    <!-- Delete Account Confirmation Modal -->
    <div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true" ref="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteAccountModalLabel">Confirm Account Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-danger">Warning: This action cannot be undone. All your data will be permanently deleted.</p>
            <p>Please type <strong>DELETE</strong> to confirm:</p>
            <input type="text" class="form-control" v-model="deleteConfirmation">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-danger" 
              :disabled="deleteConfirmation !== 'DELETE'"
              @click="deleteAccount"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineEmits } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

const emit = defineEmits(['logout']);
const auth = useAuthStore();
const deleteConfirmation = ref('');
let deleteModal = null;

const API_URL = import.meta.env.VITE_BASE_API_URL;

onMounted(() => {
  // Initialize Bootstrap modal
  if (typeof bootstrap !== 'undefined') {
    deleteModal = new bootstrap.Modal(document.getElementById('deleteAccountModal'));
  }
});

// Export user data as JSON
const exportData = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/tasks`, {
      params: { userId: auth.user.id }
    });

    // Filter out sensitive information
    const filteredTasks = data.map(({ id, title, description, dueDate, priority }) => ({
      id,
      title,
      description,
      dueDate,
      priority
    }));

    // Create and download JSON file
    const jsonData = JSON.stringify({ user: auth.user, tasks: filteredTasks }, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    // console.error('Error exporting data:', error);
    alert('Failed to export data. Please try again.');
  }
};

// Show delete account confirmation modal
const confirmDeleteAccount = () => {
  deleteConfirmation.value = '';
  if (deleteModal) {
    deleteModal.show();
  }
};

// Delete account and associated data
const deleteAccount = async () => {
  try {
    // First delete all user tasks
    const { data: tasks } = await axios.get(`${API_URL}/tasks`, {
      params: { userId: auth.user.id }
    });
    
    // Delete each task
    for (const task of tasks) {
      await axios.delete(`${API_URL}/tasks/${task.id}`);
    }
    
    // Delete user account
    await axios.delete(`${API_URL}/users/${auth.user.id}`);
    
    // Close modal and logout
    if (deleteModal) {
      deleteModal.hide();
    }
    
    emit('logout');
  } catch (error) {
    // console.error('Error deleting account:', error);
    alert('Failed to delete account. Please try again.');
  }
};
</script>
