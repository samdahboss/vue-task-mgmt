<template>
  <div class="row mb-4 g-4">
    <div class="col-md-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Monthly Task Creation</h5>
          <p class="text-muted small mb-0">Number of tasks created per month</p>
        </div>
        <div class="card-body p-4">
          <div class="chart-container" style="position: relative; height:300px;">
            <div class="monthly-chart">
              <div v-for="(count, index) in analytics.monthlyTrend.counts" :key="index" 
                   class="chart-bar" :style="{height: `${(count/Math.max(...analytics.monthlyTrend.counts || [1]))*240}px`}">
                <div class="chart-bar-value">{{ count }}</div>
                <div class="chart-bar-label">{{ analytics.monthlyTrend.months[index] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-4">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent border-0 pt-4 px-4">
          <h5 class="mb-0 fw-bold">Task Priority Distribution</h5>
          <p class="text-muted small mb-0">Breakdown by priority</p>
        </div>
        <div class="card-body p-4">
          <div class="priority-stats">
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
</template>

<script setup>
import { defineProps } from 'vue';

// Props definition
defineProps({
  analytics: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.monthly-chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100%;
}

.chart-bar {
  width: 40px;
  background-color: #3b82f6;
  border-radius: 6px 6px 0 0;
  position: relative;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.chart-bar-value {
  position: absolute;
  top: -25px;
  font-weight: bold;
}

.chart-bar-label {
  position: absolute;
  bottom: -25px;
  font-size: 0.8rem;
  white-space: nowrap;
}
</style>
