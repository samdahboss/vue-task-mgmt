<template>
  <div class="stats-section py-5 my-5">
    <div class="container">
      <div class="row g-4 text-center">
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-card">
            <div class="stat-value count-up" data-count="10000">0</div>
            <div class="stat-label">Tasks Completed</div>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-card">
            <div class="stat-value count-up" data-count="5000">0</div>
            <div class="stat-label">Happy Users</div>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div class="stat-card">
            <div class="stat-value count-up" data-count="95">0</div>
            <div class="stat-label">Productivity Increase</div>
            <div class="stat-unit">%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Animate count-up numbers
  const countElements = document.querySelectorAll(".count-up");
  countElements.forEach((element) => {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2000; // ms
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCount = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount();
          observer.disconnect();
        }
      });
    });

    observer.observe(element);
  });
});
</script>

<style scoped>
/* Stats section */
.stats-section {
  background-color: rgba(79, 70, 229, 0.03);
  padding: 60px 0;
}

.stat-card {
  padding: 30px;
  border-radius: 12px;
  position: relative;
}

.stat-value {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary-color);
  display: inline-block;
}

.stat-unit {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  display: inline-block;
  margin-left: 5px;
}

.stat-label {
  font-size: 1.1rem;
  color: #6c757d;
  margin-top: 5px;
}

/* Dark mode styles */
:deep(.dark-theme) .stats-section {
  background-color: var(--stats-bg-dark);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
}

:deep(.dark-theme) .stat-value,
:deep(.dark-theme) .stat-unit {
  color: var(--stats-value-color-dark);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:deep(.dark-theme) .stat-label {
  color: var(--stats-label-color-dark);
}

@media (max-width: 992px) {
  .stat-value {
    font-size: 2.5rem;
  }
}
</style>
