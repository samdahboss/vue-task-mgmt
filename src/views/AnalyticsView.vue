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
      <AnalyticsSummaryCards :analytics="analytics" />
      
      <!-- Charts and Detailed Stats -->
      <AnalyticsCharts :analytics="analytics" />
      
      <!-- Recent Activity -->
      <AnalyticsActivity 
        :activities="analytics.taskMetrics.recentActivity" 
        :getPriorityBadgeClass="getPriorityBadgeClass"
        :formatDate="formatDate"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAnalyticsStore } from '../stores/analytics'
import { useRouter } from 'vue-router'
import AnalyticsSummaryCards from '../components/analytics/AnalyticsSummaryCards.vue'
import AnalyticsCharts from '../components/analytics/AnalyticsCharts.vue'
import AnalyticsActivity from '../components/analytics/AnalyticsActivity.vue'

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
</style>
