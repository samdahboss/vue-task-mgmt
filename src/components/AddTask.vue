<template>
  <div class="container py-5">
    <h2 class="mb-4">Add Task</h2>
    <form @submit.prevent="handleAddTask" novalidate :class="{ 'was-validated': validated }">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="title" type="text" class="form-control" required />
        <div class="invalid-feedback">Title is required.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="description" class="form-control" required></textarea>
        <div class="invalid-feedback">Description is required.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Priority</label>
        <select v-model="priority" class="form-select" required>
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div class="invalid-feedback">Priority is required.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Due Date</label>
        <input v-model="dueDate" type="date" class="form-control" required />
        <div class="invalid-feedback">Due date is required.</div>
      </div>
      <button type="submit" class="btn btn-primary">Add Task</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const priority = ref('')
const dueDate = ref('')
const error = ref('')
const validated = ref(false)
const auth = useAuthStore()
const router = useRouter()

const handleAddTask = async () => {
  validated.value = true
  error.value = ''
  if (!title.value || !description.value || !priority.value || !dueDate.value) return
  try {
    await axios.post('https://683b92ba28a0b0f2fdc4f63d.mockapi.io/tasks', {
      title: title.value,
      description: description.value,
      priority: priority.value,
      dueDate: dueDate.value,
      completed: false,
      userId: auth.user.id
    })
    router.push('/tasks')
  } catch (e) {
    error.value = 'Failed to add task.'
  }
}
</script>
