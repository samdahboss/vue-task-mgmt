<template>
  <div class="row mb-4 g-4">
    <div class="col-md-8">
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
    
    <div class="col-md-4">
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
