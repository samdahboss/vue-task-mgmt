<template>
  <div class="row mb-4">
    <div class="col-12">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-0 fw-bold">Recent Tasks</h5>
            <p class="text-muted small mb-0">Latest tasks and their status</p>
          </div>
          <router-link to="/tasks" class="btn btn-sm btn-outline-primary">
            View All
          </router-link>
        </div>
        <div class="card-body p-4">
          <div v-if="tasks.length === 0" class="alert alert-info mb-0">
            No recent tasks found. Start by creating a new task.
          </div>
          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks.slice(0, 5)" :key="task.id">
                  <td>{{ task.title }}</td>
                  <td>
                    <span :class="getPriorityBadgeClass(task.priority)" class="badge">{{ task.priority }}</span>
                  </td>
                  <td>{{ task.dueDate }}</td>
                  <td>
                    <span v-if="task.completed" class="badge bg-success">Completed</span>
                    <span v-else class="badge bg-warning text-dark">Pending</span>
                  </td>
                  <td>
                    <button v-if="!task.completed" class="btn btn-success btn-sm me-1" @click="$emit('complete', task)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </button>
                    <button class="btn btn-secondary btn-sm me-1" @click="$emit('edit', task)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                    </button>
                    <button class="btn btn-danger btn-sm" @click="$emit('delete', task)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                      </svg>
                    </button>
                  </td>
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

/* Improve hover effect */
.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
  transition: background-color 0.2s ease;
}
</style>
