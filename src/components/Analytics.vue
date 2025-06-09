<template>
  <div class="dashboard-container p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 fw-bold">Analytics</h2>
    </div>
    
    <div v-if="analytics.isLoading" class="text-center py-5">
      <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
    </div>
    <div v-else>
      <!-- Summary Cards -->
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
      
      <!-- Charts and Detailed Stats -->
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
      
      <!-- Recent Activity -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-4 px-4">
              <h5 class="mb-0 fw-bold">Recent Activity</h5>
              <p class="text-muted small mb-0">Latest actions on your tasks</p>
            </div>
            <div class="card-body p-4">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Action</th>
                      <th>Priority</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="activity in analytics.taskMetrics.recentActivity" :key="activity.id">
                      <td>{{ activity.title }}</td>
                      <td>
                        <span class="badge" :class="activity.action === 'completed' ? 'bg-success' : 'bg-primary'">
                          {{ activity.action }}
                        </span>
                      </td>
                      <td>
                        <span class="badge" :class="getPriorityBadgeClass(activity.priority)">
                          {{ activity.priority }}
                        </span>
                      </td>
                      <td>{{ formatDate(activity.date) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAnalyticsStore } from '../stores/analytics'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const analytics = useAnalyticsStore()
const router = useRouter()

const getPriorityBadgeClass = (priority) => {
  switch(priority) {
    case 'High': return 'bg-danger';
    case 'Medium': return 'bg-primary';
    case 'Low': return 'bg-info';
    default: return 'bg-secondary';
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  if (!auth.user) {
    router.push('/login')
    return
  }
  
  await analytics.fetchAnalytics(auth.user.id)
})
</script>

<style scoped>
.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
}

.monthly-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  padding-top: 20px;
}

.chart-bar {
  width: 12%;
  min-width: 35px;
  background-color: rgba(13, 110, 253, 0.2);
  border-radius: 4px 4px 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
}

.chart-bar:hover {
  background-color: rgba(13, 110, 253, 0.4);
}

.chart-bar-value {
  position: absolute;
  top: -25px;
  font-weight: bold;
  font-size: 0.8rem;
}

.chart-bar-label {
  position: absolute;
  bottom: -25px;
  font-size: 0.8rem;
}
</style>
