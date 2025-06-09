<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Task History</h2>
          <button 
            class="btn btn-outline-secondary d-flex align-items-center" 
            @click="fetchCompletedTasks"
            :disabled="loading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise me-2" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="row">
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    
    <div v-else>
      <div v-if="tasks.length === 0" class="alert alert-info">
        <div class="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          No completed tasks found.
        </div>
      </div>
      
      <div v-else class="card shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-3">Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th class="pe-3">Completed At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task.id">
                  <td class="ps-3 fw-medium">{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>
                    <span :class="getPriorityBadgeClass(task.priority)" class="badge">
                      {{ task.priority }}
                    </span>
                  </td>
                  <td>{{ formatDate(task.dueDate) }}</td>
                  <td class="pe-3">{{ task.updatedAt ? formatDateTime(task.updatedAt) : '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const tasks = ref([]);
const loading = ref(true);

// Get priority badge class based on priority level
const getPriorityBadgeClass = (priority) => {
  switch(priority) {
    case 'High': return 'bg-danger';
    case 'Medium': return 'bg-primary';
    case 'Low': return 'bg-info';
    default: return 'bg-secondary';
  }
};

// Format date to a more readable format
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format date and time
const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

const fetchCompletedTasks = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks', {
      params: { userId: auth.user.id, completed: true }
    });
    tasks.value = data;
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!auth.user) {
    router.push('/login');
    return;
  }
  fetchCompletedTasks();
});
</script>
