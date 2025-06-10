<template>
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-transparent border-0 pt-4 px-4">
      <h5 class="mb-0 fw-bold">Priority-Based Task Performance</h5>
      <p class="text-muted small mb-0">Completed vs. Pending Tasks by Priority Level</p>
    </div>
    <div class="card-body p-4">
      <Bar :data="chartData" :options="chartOptions" class="chart-container" />
    </div>
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { computed } from "vue";
import { useAnalyticsStore } from "@/stores/analytics";
import { storeToRefs } from "pinia";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const analytics = useAnalyticsStore();
const { taskMetrics } = storeToRefs(analytics);

const chartData = computed(() => {
  const priorities = ["High", "Medium", "Low"];
  return {
    labels: priorities,
    datasets: [
      {
        label: "Completed Tasks",
        backgroundColor: "#198754", // Bootstrap success color
        data: priorities.map(
          (priority) => taskMetrics.value.completionByPriority[priority].completed
        ),
      },
      {
        label: "Pending Tasks",
        backgroundColor: "#dc3545", // Bootstrap danger color
        data: priorities.map(
          (priority) => taskMetrics.value.completionByPriority[priority].pending
        ),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || "";
          const value = context.parsed.y;
          return `${label}: ${value} tasks`;
        },
      },
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>
