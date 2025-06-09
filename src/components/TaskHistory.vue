<template>
  <div class="container py-5">
    <h2 class="mb-4">Task History</h2>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
    </div>
    <div v-else>
      <div v-if="tasks.length === 0" class="alert alert-info">No completed tasks found.</div>
      <div v-else>
        <div class="table-responsive">
          <table class="table table-bordered align-middle">
            <thead class="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Completed At</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.priority }}</td>
                <td>{{ task.dueDate }}</td>
                <td>{{ task.updatedAt ? new Date(task.updatedAt).toLocaleString() : '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const tasks = ref([])
const loading = ref(true)

const fetchCompletedTasks = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks', {
      params: { userId: auth.user.id, completed: true }
    })
    tasks.value = data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!auth.user) {
    router.push('/login')
    return
  }
  fetchCompletedTasks()
})
</script>
