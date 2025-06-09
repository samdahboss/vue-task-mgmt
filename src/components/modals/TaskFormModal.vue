<template>
  <div class="modal fade" id="taskFormModal" tabindex="-1" aria-labelledby="taskFormModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0 rounded-4">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title" id="taskFormModalLabel">
            {{ isEditing ? 'Edit Task' : 'Add Task' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <TaskFormFields 
            :formData="formData" 
            :validated="validated" 
            :error="error" 
            @submit="handleSubmit" 
          />
        </div>
        <div class="modal-footer border-top-0 pt-0">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
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
import TaskFormFields from '../tasks/TaskFormFields.vue';

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

const formData = ref({
  title: '',
  description: '',
  priority: '',
  dueDate: ''
});
const error = ref('');
const validated = ref(false);
const submitting = ref(false);
const isEditing = ref(false);
let modal = null;

// Initialize or reset form
const initForm = () => {
  if (props.task) {
    isEditing.value = true;
    formData.value = {
      title: props.task.title || '',
      description: props.task.description || '',
      priority: props.task.priority || '',
      dueDate: props.task.dueDate || ''
    };
  } else {
    isEditing.value = false;
    formData.value = {
      title: '',
      description: '',
      priority: '',
      dueDate: ''
    };
  }
  error.value = '';
  validated.value = false;
  submitting.value = false;
};

// Handle form submission
const handleSubmit = async () => {
  validated.value = true;
  error.value = '';
  
  if (!formData.value.title || !formData.value.description || 
      !formData.value.priority || !formData.value.dueDate) {
    return;
  }
  
  submitting.value = true;
  
  try {
    if (isEditing.value && props.task) {
      emit('submit', { ...props.task, ...formData.value });
    } else {
      emit('submit', formData.value);
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
