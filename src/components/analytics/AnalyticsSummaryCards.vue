<template>
  <div class="row mb-4 g-4">
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-success bg-opacity-10 p-3 me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-up text-success" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
              </svg>
            </div>
            <h5 class="card-title mb-0 fw-bold">Productivity Score</h5>
          </div>
          <p class="card-text display-5 fw-bold text-success">{{ analytics.productivityScore }}</p>
          <p class="text-muted">Overall performance score</p>
        </div>
      </div>
    </div>
    
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clock text-primary" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
            </div>
            <h5 class="card-title mb-0 fw-bold">Average Completion</h5>
          </div>
          <p class="card-text display-5 fw-bold text-primary">{{ analytics.taskMetrics.avgCompletionTime.toFixed(1) }}</p>
          <p class="text-muted">Days to complete tasks</p>
        </div>
      </div>
    </div>
    
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-info bg-opacity-10 p-3 me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-percent text-info" viewBox="0 0 16 16">
                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
            </div>
            <h5 class="card-title mb-0 fw-bold">Completion Rate</h5>
          </div>
          <p class="card-text display-5 fw-bold text-info">{{ Math.round(analytics.taskMetrics.completionRate * 100) }}%</p>
          <p class="text-muted">Tasks completed vs. total</p>
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
