<template>
  <div class="dashboard-container p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 fw-bold">Dashboard</h2>
      <button class="btn btn-primary" @click="openAddTaskModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-lg me-2"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
        New Task
      </button>
    </div>

    <div v-if="loading || analytics.isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <!-- Task Statistics Cards -->
      <StatisticsCards :stats="stats" />

      <!-- Analytics Overview -->
      <AnalyticsOverview :analytics="analytics" />

      <!-- Recent Tasks -->
      <RecentTasks
        :tasks="recentTasks"
        :getPriorityBadgeClass="getPriorityBadgeClass"
        @complete="markTaskComplete"
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
      :show="showDeleteConfirmation"
      @confirm="confirmDeleteTask"
      @close="closeDeleteConfirmationModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useAnalyticsStore } from "../stores/analytics";
import TaskFormModal from "../components/modals/TaskFormModal.vue";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal.vue";
import StatisticsCards from "../components/dashboard/StatisticsCards.vue";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview.vue";
import RecentTasks from "../components/dashboard/RecentTasks.vue";

const auth = useAuthStore();
const analytics = useAnalyticsStore();
const router = useRouter();
const stats = ref({ total: 0, completed: 0, pending: 0 });
const tasks = ref([]);
const loading = ref(true);
const recentTasks = computed(() => tasks.value.slice(0, 3));

// Modal control variables
const showTaskFormModal = ref(false);
const selectedTask = ref(null);
const showDeleteConfirmation = ref(false);
const taskToDelete = ref(null);

const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case "High":
      return "bg-danger";
    case "Medium":
      return "bg-primary";
    case "Low":
      return "bg-info";
    default:
      return "bg-secondary";
  }
};

const openAddTaskModal = () => {
  selectedTask.value = null;
  showTaskFormModal.value = true;
};

const closeTaskFormModal = () => {
  showTaskFormModal.value = false;
  selectedTask.value = null;
};

const API_URL = import.meta.env.VITE_BASE_API_URL;

const saveTask = async (taskData) => {
  try {
    if (taskData.id) {
      // Update existing task
      await axios.put(
        `${API_URL}/tasks/${taskData.id}`,
        taskData
      );
    } else {
      // Create new task
      await axios.post(`${API_URL}/tasks`, {
        ...taskData,
        completed: false,
        userId: auth.user.id,
      });
    }

    // Refresh tasks
    await fetchTasks();
  } catch (error) {
    console.error("Error saving task:", error);
  }
};

// Open modal for editing an existing task
const openEditTaskModal = (task) => {
  selectedTask.value = { ...task };
  showTaskFormModal.value = true;
};

// Mark task as complete
const markTaskComplete = async (task) => {
  try {
    await axios.put(`${API_URL}/tasks/${task.id}`, {
      ...task,
      completed: true,
    });

    // Refresh tasks
    await fetchTasks();
  } catch (error) {
    console.error("Error completing task:", error);
  }
};

// Open delete confirmation modal
const openDeleteConfirmation = (task) => {
  taskToDelete.value = task;
  showDeleteConfirmation.value = true;
};

// Close delete confirmation modal
const closeDeleteConfirmationModal = () => {
  showDeleteConfirmation.value = false;
  taskToDelete.value = null;
};

// Confirm task deletion
const confirmDeleteTask = async (task) => {
  try {
    await axios.delete(`${API_URL}/tasks/${task.id}`);

    // Refresh tasks
    await fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Fetch tasks and update statistics
const fetchTasks = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/tasks`,
      {
        params: { userId: auth.user.id },
      }
    );
    tasks.value = data.sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    stats.value.total = data.length;
    stats.value.completed = data.filter((t) => t.completed).length;
    stats.value.pending = data.filter((t) => !t.completed).length;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

onMounted(async () => {
  if (!auth.user) {
    router.push("/login");
    return;
  }

  try {
    await fetchTasks();

    // Fetch analytics data
    await analytics.fetchAnalytics(auth.user.id);
  } finally {
    loading.value = false;
  }
});
</script>
