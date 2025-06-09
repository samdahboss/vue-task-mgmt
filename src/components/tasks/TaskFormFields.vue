<template>
  <form @submit.prevent="$emit('submit')" novalidate :class="{ 'was-validated': validated }">
    <div class="mb-3">
      <label for="taskTitle" class="form-label">Title</label>
      <input 
        id="taskTitle" 
        v-model="formData.title" 
        type="text" 
        class="form-control" 
        placeholder="Enter task title"
        required 
      />
      <div class="invalid-feedback">Title is required.</div>
    </div>
    
    <div class="mb-3">
      <label for="taskDescription" class="form-label">Description</label>
      <textarea 
        id="taskDescription" 
        v-model="formData.description" 
        class="form-control" 
        placeholder="Enter task description"
        rows="3" 
        required
      ></textarea>
      <div class="invalid-feedback">Description is required.</div>
    </div>
    
    <div class="mb-3">
      <label for="taskPriority" class="form-label">Priority</label>
      <select 
        id="taskPriority" 
        v-model="formData.priority" 
        class="form-select" 
        required
      >
        <option value="">Select priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div class="invalid-feedback">Priority is required.</div>
    </div>
    
    <div class="mb-3">
      <label for="taskDueDate" class="form-label">Due Date</label>
      <input 
        id="taskDueDate" 
        v-model="formData.dueDate" 
        type="date" 
        class="form-control" 
        required 
      />
      <div class="invalid-feedback">Due date is required.</div>
    </div>
    
    <div v-if="error" class="alert alert-danger">
      <div class="d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>{{ error }}</div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  validated: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

defineEmits(['submit']);
</script>
