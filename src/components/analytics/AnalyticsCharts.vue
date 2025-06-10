<template>  <div class="row mb-4 g-4">
    <div class="col-md-12 col-lg-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Monthly Task Creation</h5>
          <p class="text-muted small mb-0">Number of tasks created per month</p>
        </div>
        <div class="card-body p-4">
          <div class="position-relative" style="height:300px;">
            <div class="d-flex justify-content-around align-items-end h-100">
              <div v-for="(count, index) in analytics.monthlyTrend.counts" :key="index" 
                   class="bg-primary rounded-top position-relative" 
                   style="width: 40px; min-height: 30px;"
                   :style="{height: `${(count/Math.max(...analytics.monthlyTrend.counts || [1]))*240}px`}">
                <div class="position-absolute top-0 start-50 translate-middle-x" style="margin-top: -25px;">
                  <span class="fw-bold">{{ count }}</span>
                </div>
                <div class="position-absolute bottom-0 start-50 translate-middle-x" style="margin-bottom: -25px;">
                  <span class="small text-nowrap">{{ analytics.monthlyTrend.months[index] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="col-md-12 col-lg-4">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Task Priority Distribution</h5>
          <p class="text-muted small mb-0">Breakdown by priority</p>
        </div>
        <div class="card-body p-4">
          <div>
            <div class="mb-4">
              <div class="d-flex justify-content-between mb-1">
                <span>High Priority</span>
                <span class="fw-bold">{{ analytics.taskMetrics.tasksByPriority.High }}</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-danger" role="progressbar" 
                     :style="{width: `${analytics.priorityDistribution.High}%`}" 
                     :aria-valuenow="analytics.priorityDistribution.High" 
                     aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="d-flex justify-content-between mb-1">
                <span>Medium Priority</span>
                <span class="fw-bold">{{ analytics.taskMetrics.tasksByPriority.Medium }}</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-primary" role="progressbar" 
                     :style="{width: `${analytics.priorityDistribution.Medium}%`}" 
                     :aria-valuenow="analytics.priorityDistribution.Medium" 
                     aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="d-flex justify-content-between mb-1">
                <span>Low Priority</span>
                <span class="fw-bold">{{ analytics.taskMetrics.tasksByPriority.Low }}</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-info" role="progressbar" 
                     :style="{width: `${analytics.priorityDistribution.Low}%`}" 
                     :aria-valuenow="analytics.priorityDistribution.Low" 
                     aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="row mb-4">
    <div class="col-12">
      <TaskCompletionChart />
    </div>
  </div>

  <!-- Existing Pie Chart Section -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Task Completion Status by Priority</h5>
          <p class="text-muted small mb-0">Breakdown of completed vs pending tasks for each priority level</p>
        </div>
        <div class="card-body p-4">
          <div class="row align-items-center">
            <div class="col-md-4" v-for="priority in ['High', 'Medium', 'Low']" :key="priority">
              <div class="text-center mb-4">
                <h6 class="mb-3">{{ priority }} Priority</h6>
                <div class="position-relative" style="height: 160px; width: 160px; margin: 0 auto;">
                  <!-- Pie chart circle -->
                  <svg viewBox="0 0 36 36" class="pie-chart">
                    <path class="pie-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path
                      :class="'pie-chart-fill ' + getPriorityClass(priority)"
                      :stroke-dasharray="`${getCompletionPercentage(priority)}, 100`"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <!-- Center percentage text -->
                  <div class="pie-center-text">
                    {{ getCompletionPercentage(priority) }}%
                  </div>
                </div>
                <div class="mt-3">
                  <div class="d-flex justify-content-between small mb-2">
                    <span>
                      <i class="bi bi-check-circle-fill text-success me-1"></i>
                      Completed: {{ analytics.taskMetrics.completionByPriority[priority].completed }}
                    </span>
                    <span>
                      <i class="bi bi-clock-fill text-warning me-1"></i>
                      Pending: {{ analytics.taskMetrics.completionByPriority[priority].pending }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnalyticsStore } from "@/stores/analytics";
import { storeToRefs } from "pinia";
import TaskCompletionChart from "./TaskCompletionChart.vue";

const analytics = useAnalyticsStore();
const { taskMetrics } = storeToRefs(analytics);

// Props definition
const props = defineProps({
  analytics: {
    type: Object,
    required: true
  }
});

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High': return 'priority-high';
    case 'Medium': return 'priority-medium';
    case 'Low': return 'priority-low';
    default: return '';
  }
};

const getCompletionPercentage = (priority) => {
  const { completed, pending } = props.analytics.taskMetrics.completionByPriority[priority];
  const total = completed + pending;
  return total === 0 ? 0 : Math.round((completed / total) * 100);
};
</script>

<style scoped>
.pie-chart {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.pie-chart-bg {
  fill: none;
  stroke: var(--gray-200);
  stroke-width: 2.8;
}

.pie-chart-fill {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.priority-high {
  stroke: var(--danger-color);
}

.priority-medium {
  stroke: var(--primary-color);
}

.priority-low {
  stroke: var(--info-color);
}

.pie-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: bold;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

:deep(.dark-theme) .pie-chart-bg {
  stroke: var(--gray-700);
}
</style>
