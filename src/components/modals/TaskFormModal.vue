<template>
  <div class="modal fade" id="taskFormModal" tabindex="-1" aria-labelledby="taskFormModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="taskFormModalLabel">
            {{ isEditing ? 'Edit Task' : 'Add Task' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit" novalidate :class="{ 'was-validated': validated }">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input v-model="title" type="text" class="form-control custom-input" required />
              <div class="invalid-feedback">Title is required.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="description" class="form-control custom-input" rows="3" required></textarea>
              <div class="invalid-feedback">Description is required.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Priority</label>
              <select v-model="priority" class="form-select custom-input" required>
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div class="invalid-feedback">Priority is required.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Due Date</label>
              <input v-model="dueDate" type="date" class="form-control custom-input" required />
              <div class="invalid-feedback">Due date is required.</div>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="handleSubmit"
            :disabled="submitting"
          >
            <span v-if="submitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isEditing ? 'Update Task' : 'Add Task' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { Modal } from 'bootstrap';

const props = defineProps({
  task: {
    type: Object,
    default: () => null
  },
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'close']);

const title = ref('');
const description = ref('');
const priority = ref('');
const dueDate = ref('');
const error = ref('');
const validated = ref(false);
const submitting = ref(false);
const isEditing = ref(false);
let modal = null;

// Initialize or reset form
const initForm = () => {
  if (props.task) {
    isEditing.value = true;
    title.value = props.task.title || '';
    description.value = props.task.description || '';
    priority.value = props.task.priority || '';
    dueDate.value = props.task.dueDate || '';
  } else {
    isEditing.value = false;
    title.value = '';
    description.value = '';
    priority.value = '';
    dueDate.value = '';
  }
  error.value = '';
  validated.value = false;
  submitting.value = false;
};

// Handle form submission
const handleSubmit = async () => {
  validated.value = true;
  error.value = '';
  
  if (!title.value || !description.value || !priority.value || !dueDate.value) {
    return;
  }
  
  submitting.value = true;
  
  try {
    const taskData = {
      title: title.value,
      description: description.value,
      priority: priority.value,
      dueDate: dueDate.value,
    };
    
    if (isEditing.value && props.task) {
      emit('submit', { ...props.task, ...taskData });
    } else {
      emit('submit', taskData);
    }
    
    // Close modal after successful submission
    modal.hide();
  } catch (e) {
    error.value = isEditing.value ? 'Failed to update task.' : 'Failed to add task.';
  } finally {
    submitting.value = false;
  }
};

// Watch for show prop changes to show/hide modal
watch(() => props.show, (newVal) => {
  if (newVal) {
    initForm();
    modal.show();
  } else {
    modal.hide();
  }
});

// Watch for task prop changes to update form
watch(() => props.task, (newVal) => {
  if (newVal) {
    initForm();
  }
});

// Initialize Bootstrap modal after component is mounted
onMounted(() => {
  modal = new Modal(document.getElementById('taskFormModal'));
  
  // Handle modal hidden event to emit close event
  document.getElementById('taskFormModal').addEventListener('hidden.bs.modal', () => {
    emit('close');
  });
});
</script>

<style scoped>
.custom-input {
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(79, 70, 229, 0.25);
  transform: translateY(-2px);
}

.modal-content {
  border-radius: 1rem;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
