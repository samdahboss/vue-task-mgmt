<template>
  <div class="row">
    <div class="col-12">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Recent Activity</h5>
          <p class="text-muted small mb-0">Latest actions on your tasks</p>
        </div>
        <div class="card-body p-4">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Action</th>
                  <th>Priority</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="activity in activities" :key="activity.id">
                  <td>{{ activity.title }}</td>
                  <td>
                    <span class="badge" :class="activity.action === 'completed' ? 'bg-success' : 'bg-primary'">
                      {{ activity.action }}
                    </span>
                  </td>
                  <td>
                    <span class="badge" :class="getPriorityBadgeClass(activity.priority)">
                      {{ activity.priority }}
                    </span>
                  </td>
                  <td>{{ formatDate(activity.date) }}</td>
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
import { defineProps } from 'vue';

// Props definition
defineProps({
  activities: {
    type: Array,
    required: true
  },
  getPriorityBadgeClass: {
    type: Function,
    required: true
  },
  formatDate: {
    type: Function,
    required: true
  }
});
</script>
