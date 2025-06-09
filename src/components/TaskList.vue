<template>
  <div class="container py-5">
    <h2 class="mb-4">My Tasks</h2>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
    </div>
    <div v-else>
      <div class="mb-3">
        <router-link to="/add-task" class="btn btn-primary">Add Task</router-link>
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
                <td>{{ task.priority }}</td>
                <td>{{ task.dueDate }}</td>
                <td>
                  <span v-if="task.completed" class="badge bg-success">Completed</span>
                  <span v-else class="badge bg-warning text-dark">Pending</span>
                </td>
                <td>
                  <button v-if="!task.completed" class="btn btn-success btn-sm me-1" @click="markComplete(task)">Complete</button>
                  <button class="btn btn-secondary btn-sm me-1" @click="editTask(task)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteTask(task)">Delete</button>
                </td>
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

const fetchTasks = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks', {
      params: { userId: auth.user.id }
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
  fetchTasks()
})

const markComplete = async (task) => {
  await axios.put(`https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks/${task.id}`, { ...task, completed: true })
  fetchTasks()
}

const editTask = (task) => {
  router.push({ path: '/edit-task', query: { id: task.id } })
}

const deleteTask = async (task) => {
  await axios.delete(`https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks/${task.id}`)
  fetchTasks()
}
</script>
