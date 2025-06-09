<template>
  <div>
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
                <button v-if="!task.completed" class="btn btn-success btn-sm me-1" @click="$emit('complete', task)">Complete</button>
                <button class="btn btn-secondary btn-sm me-1" @click="$emit('edit', task)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="$emit('delete', task)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Props definition
defineProps({
  tasks: {
    type: Array,
    required: true
  },
  getPriorityBadgeClass: {
    type: Function,
    required: true
  }
});

// Define emits
defineEmits(['complete', 'edit', 'delete']);
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}

/* Improve contrast for dark mode */
:deep(.dark-theme) .text-primary {
  color: #a5b4fc !important;
}

:deep(.dark-theme) .text-success {
  color: #86efac !important;
}

:deep(.dark-theme) .text-warning {
  color: #fcd34d !important;
}

:deep(.dark-theme) .text-info {
  color: #93c5fd !important;
}
</style>
