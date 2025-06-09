<template>
  <div class="row mb-4 g-4">
    <div class="col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Productivity Score</h5>
          <p class="text-muted small mb-0">Based on completion rate and speed</p>
        </div>
        <div class="card-body p-4">
          <div class="productivity-meter">
            <div class="progress mb-3" style="height: 8px">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                :style="{ width: `${analytics.productivityScore}%` }"
                :aria-valuenow="analytics.productivityScore"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted small">Needs Improvement</span>
              <span class="fw-bold">{{ analytics.productivityScore }}/100</span>
              <span class="text-muted small">Excellent</span>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <div class="text-center">
                <h6 class="fw-bold mb-1">
                  {{ Math.round(analytics.taskMetrics.completionRate * 100) }}%
                </h6>
                <p class="text-muted small">Completion Rate</p>
              </div>
            </div>
            <div class="col-6">
              <div class="text-center">
                <h6 class="fw-bold mb-1">
                  {{ analytics.taskMetrics.avgCompletionTime.toFixed(1) }} days
                </h6>
                <p class="text-muted small">Avg Completion Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Priority Distribution</h5>
          <p class="text-muted small mb-0">Your task priorities</p>
        </div>
        <div class="card-body p-4">
          <div class="row">
            <div class="col-4 text-center">
              <div class="progress-circle progress-circle-high mb-3">
                <h4 class="fw-bold mb-0">
                  {{ analytics.priorityDistribution.High }}%
                </h4>
              </div>
              <h6 class="mb-0 priority-high">High</h6>
            </div>
            <div class="col-4 text-center">
              <div class="progress-circle progress-circle-medium mb-3">
                <h4 class="fw-bold mb-0">
                  {{ analytics.priorityDistribution.Medium }}%
                </h4>
              </div>
              <h6 class="mb-0 priority-medium">Medium</h6>
            </div>
            <div class="col-4 text-center">
              <div class="progress-circle progress-circle-low mb-3">
                <h4 class="fw-bold mb-0">
                  {{ analytics.priorityDistribution.Low }}%
                </h4>
              </div>
              <h6 class="mb-0 priority-low">Low</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  analytics: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.progress-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.progress-circle-high {
  background-color: rgba(220, 53, 69, 0.15);
  color: #dc3545;
}

.progress-circle-medium {
  background-color: rgba(13, 110, 253, 0.15);
  color: #0d6efd;
}

.progress-circle-low {
  background-color: rgba(13, 202, 240, 0.15);
  color: #0dcaf0;
}

.priority-high {
  color: #dc3545;
}

.priority-medium {
  color: #0d6efd;
}

.priority-low {
  color: #0dcaf0;
}
</style>
