<template>
  <div class="row mb-4 g-4">
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-list-task text-primary"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                />
                <path
                  d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                />
              </svg>
            </div>
            <h5 class="card-title mb-0 fw-bold">Total Tasks</h5>
          </div>
          <p class="card-text display-5 fw-bold text-primary">{{ stats.total }}</p>
          <p class="text-muted">All your tasks</p>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-success bg-opacity-10 p-3 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-check2-circle text-success"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
                />
                <path
                  d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
                />
              </svg>
            </div>
            <h5 class="card-title mb-0 fw-bold">Completed</h5>
          </div>
          <p class="card-text display-5 fw-bold text-success">
            {{ stats.completed }}
          </p>
          <p class="text-muted">Tasks you've finished</p>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-hourglass-split text-warning"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
                />
              </svg>
            </div>
            <h5 class="card-title mb-0 fw-bold">Pending</h5>
          </div>
          <p class="card-text display-5 fw-bold text-warning">{{ stats.pending }}</p>
          <p class="text-muted">Tasks in progress</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script>
