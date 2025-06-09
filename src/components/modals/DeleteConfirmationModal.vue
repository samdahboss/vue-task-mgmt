<template>
  <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete the task <strong>"{{ taskTitle }}"</strong>?</p>
          <p class="text-danger mb-0"><small>This action cannot be undone.</small></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button 
            type="button" 
            class="btn btn-danger" 
            @click="confirmDelete"
            :disabled="deleting"
          >
            <span v-if="deleting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch } from 'vue';
import { Modal } from 'bootstrap';

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['confirm', 'close']);
const deleting = ref(false);
const taskTitle = ref('');
let modal = null;

// Handle delete confirmation
const confirmDelete = async () => {
  deleting.value = true;
  try {
    emit('confirm', props.task);
    modal.hide();
  } finally {
    deleting.value = false;
  }
};

// Watch for show prop changes to show/hide modal
watch(() => props.show, (newVal) => {
  if (newVal && props.task) {
    taskTitle.value = props.task.title || 'this task';
    modal.show();
  } else if (modal) {
    modal.hide();
  }
});

// Initialize Bootstrap modal after component is mounted
onMounted(() => {
  modal = new Modal(document.getElementById('deleteConfirmationModal'));
  
  // Handle modal hidden event to emit close event
  document.getElementById('deleteConfirmationModal').addEventListener('hidden.bs.modal', () => {
    emit('close');
  });
});
</script>

<style scoped>
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
