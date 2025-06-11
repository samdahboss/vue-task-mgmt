<template>
  <div class="container py-5">
    <h2 class="mb-4">My Tasks</h2>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
    </div>
    <div v-else>
      <div class="mb-3">
        <button class="btn btn-primary" @click="openAddTaskModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg me-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
          Add Task
        </button>
      </div>
      <TaskTable 
        :tasks="tasks" 
        :getPriorityBadgeClass="getPriorityBadgeClass"
        @complete="markComplete"
        @edit="openEditTaskModal"
        @delete="openDeleteConfirmation"
      />
    </div>

    <!-- Task Form Modal for Add/Edit -->
    <TaskFormModal 
      :task="selectedTask" 
      :show="showTaskFormModal" 
      @submit="saveTask" 
      @close="closeTaskFormModal" 
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal 
      :task="taskToDelete" 
      :show="showDeleteConfirmationModal" 
      @confirm="confirmDeleteTask" 
      @close="closeDeleteConfirmationModal" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import TaskTable from '../components/tasks/TaskTable.vue';
import TaskFormModal from '../components/modals/TaskFormModal.vue';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal.vue';

const auth = useAuthStore();
const router = useRouter();
const tasks = ref([]);
const loading = ref(true);

// Modal control variables
const showTaskFormModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const selectedTask = ref(null);
const taskToDelete = ref(null);

// Get priority badge class based on priority level
const getPriorityBadgeClass = (priority) => {
  switch(priority) {
    case 'High': return 'bg-danger';
    case 'Medium': return 'bg-primary';
    case 'Low': return 'bg-info';
    default: return 'bg-secondary';
  }
};

const API_URL = import.meta.env.VITE_BASE_API_URL;

const fetchTasks = async () => {
  loading.value = true;

  try {
    const { data } = await axios.get(`${API_URL}/tasks`, {
      params: { userId: auth.user.id }
    });
    tasks.value = data;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!auth.user) {
    router.push('/login');
    return;
  }
  fetchTasks();
});

// Mark task as complete
const markComplete = async (task) => {
  try {
    await axios.put(`${API_URL}/tasks/${task.id}`, { 
      ...task, 
      completed: true 
    });
    fetchTasks();
  } catch (error) {
    // console.error('Error completing task:', error);
  }
};

// Open modal for adding a new task
const openAddTaskModal = () => {
  selectedTask.value = null;
  showTaskFormModal.value = true;
};

// Open modal for editing an existing task
const openEditTaskModal = (task) => {
  selectedTask.value = { ...task };
  showTaskFormModal.value = true;
};

// Close task form modal
const closeTaskFormModal = () => {
  showTaskFormModal.value = false;
  selectedTask.value = null;
};

// Save task (add new or update existing)
const saveTask = async (taskData) => {
  try {
    if (taskData.id) {
      // Update existing task
      await axios.put(`${API_URL}/tasks/${taskData.id}`, taskData);
    } else {
      // Create new task
      await axios.post(`${API_URL}/tasks`, {
        ...taskData,
        completed: false,
        userId: auth.user.id
      });
    }
    fetchTasks();
  } catch (error) {
    // console.error('Error saving task:', error);
  }
};

// Open delete confirmation modal
const openDeleteConfirmation = (task) => {
  taskToDelete.value = task;
  showDeleteConfirmationModal.value = true;
};

// Close delete confirmation modal
const closeDeleteConfirmationModal = () => {
  showDeleteConfirmationModal.value = false;
  taskToDelete.value = null;
};

// Confirm task deletion
const confirmDeleteTask = async (task) => {
  try {
    await axios.delete(`${API_URL}/tasks/${task.id}`);
    fetchTasks();
  } catch (error) {
    // console.error('Error deleting task:', error);
  }
};
</script>
