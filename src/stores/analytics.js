import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAnalyticsStore = defineStore("analytics", () => {
  // Analytics data
  const taskMetrics = ref({
    totalCreated: 0,
    completionRate: 0,
    avgCompletionTime: 0,
    tasksByPriority: {
      High: 0,
      Medium: 0,
      Low: 0,
    },
    completionByPriority: {
      High: { completed: 0, pending: 0 },
      Medium: { completed: 0, pending: 0 },
      Low: { completed: 0, pending: 0 },
    },
    tasksByMonth: {},
    recentActivity: [],
  });

  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties for derived analytics
  const productivityScore = computed(() => {
    return Math.round(
      ((taskMetrics.value.completionRate * 100) /
        (taskMetrics.value.avgCompletionTime || 1)) *
        10
    );
  });

  const priorityDistribution = computed(() => {
    const total =
      Object.values(taskMetrics.value.tasksByPriority).reduce(
        (sum, count) => sum + count,
        0
      ) || 1;
    return {
      High: Math.round((taskMetrics.value.tasksByPriority.High / total) * 100),
      Medium: Math.round(
        (taskMetrics.value.tasksByPriority.Medium / total) * 100
      ),
      Low: Math.round((taskMetrics.value.tasksByPriority.Low / total) * 100),
    };
  });

  const monthlyTrend = computed(() => {
    const months = [];
    const counts = [];

    Object.entries(taskMetrics.value.tasksByMonth || {})
      .sort(([monthA], [monthB]) => new Date(monthA) - new Date(monthB))
      .forEach(([month, count]) => {
        months.push(
          new Date(month).toLocaleString("default", { month: "short" })
        );
        counts.push(count);
      });

    return { months, counts };
  });

  // Actions
  async function fetchAnalytics(userId) {
    const API_URL = import.meta.env.VITE_BASE_API_URL;
    
    if (!userId) return;

    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(`${API_URL}/tasks`, {
        params: { userId },
      });

      calculateMetrics(data);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      error.value = "Failed to load analytics data";
    } finally {
      isLoading.value = false;
    }
  }

  function calculateMetrics(tasks) {
    if (!tasks.length) return;

    // Reset metrics
    taskMetrics.value.tasksByPriority = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    taskMetrics.value.completionByPriority = {
      High: { completed: 0, pending: 0 },
      Medium: { completed: 0, pending: 0 },
      Low: { completed: 0, pending: 0 },
    };

    // Calculate task metrics
    tasks.forEach((task) => {
      // Update task count by priority
      taskMetrics.value.tasksByPriority[task.priority]++;

      // Update completion status by priority
      if (task.completed) {
        taskMetrics.value.completionByPriority[task.priority].completed++;
      } else {
        taskMetrics.value.completionByPriority[task.priority].pending++;
      }
    });

    // Basic metrics
    taskMetrics.value.totalCreated = tasks.length;

    const completedTasks = tasks.filter((t) => t.completed);
    taskMetrics.value.completionRate = completedTasks.length / tasks.length;

    // Calculate average completion time (in days) for completed tasks
    const completionTimes = completedTasks
      .filter((t) => t.completedAt && t.createdAt)
      .map((t) => {
        const created = new Date(t.createdAt);
        const completed = new Date(t.completedAt);
        return (completed - created) / (1000 * 60 * 60 * 24); // days
      });

    taskMetrics.value.avgCompletionTime = completionTimes.length
      ? completionTimes.reduce((sum, time) => sum + time, 0) /
        completionTimes.length
      : 0;

    // Tasks by month
    const byMonth = {};
    tasks.forEach((task) => {
      const date = new Date(task.createdAt || Date.now());
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      byMonth[monthYear] = (byMonth[monthYear] || 0) + 1;
    });
    taskMetrics.value.tasksByMonth = byMonth;

    // Recent activity
    taskMetrics.value.recentActivity = tasks
      .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
      .slice(0, 10)
      .map((task) => ({
        id: task.id,
        title: task.title,
        action: task.completed ? "completed" : "created",
        date: task.updatedAt || task.createdAt,
        priority: task.priority,
      }));
  }

  return {
    taskMetrics,
    isLoading,
    error,
    productivityScore,
    priorityDistribution,
    monthlyTrend,
    fetchAnalytics,
  };
});
