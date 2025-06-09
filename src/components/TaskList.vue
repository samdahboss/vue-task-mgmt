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
      <div v-if="tasks.length === 0" class="alert alert-info">No tasks found.</div>
      <div v-else>
        <div class="table-responsive">
          <table class="table table-bordered align-middle">
            <thead class="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <span :class="getPriorityBadgeClass(task.priority)" class="badge">{{ task.priority }}</span>
                </td>
                <td>{{ task.dueDate }}</td>
                <td>
                  <span v-if="task.completed" class="badge bg-success">Completed</span>
                  <span v-else class="badge bg-warning text-dark">Pending</span>
                </td>
                <td>
                  <button v-if="!task.completed" class="btn btn-success btn-sm me-1" @click="markComplete(task)">Complete</button>
                  <button class="btn btn-secondary btn-sm me-1" @click="openEditTaskModal(task)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="openDeleteConfirmation(task)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
import TaskFormModal from './modals/TaskFormModal.vue';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal.vue';

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

const fetchTasks = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks', {
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
    await axios.put(`https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks/${task.id}`, { 
      ...task, 
      completed: true 
    });
    fetchTasks();
  } catch (error) {
    console.error('Error completing task:', error);
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
      await axios.put(`https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks/${taskData.id}`, taskData);
    } else {
      // Create new task
      await axios.post('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks', {
        ...taskData,
        completed: false,
        userId: auth.user.id
      });
    }
    fetchTasks();
  } catch (error) {
    console.error('Error saving task:', error);
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
    await axios.delete(`https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks/${task.id}`);
    fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}
</style>
