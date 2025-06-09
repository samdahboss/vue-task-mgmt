<template>
  <div class="cta-section py-5 my-5">
    <div class="container text-center py-5">
      <h2 class="fw-bold mb-4" data-aos="fade-up">Ready to Boost Your Productivity?</h2>
      <p class="lead mb-4" data-aos="fade-up" data-aos-delay="100">
        Join thousands of users who have transformed their workflow with TaskFlow.
      </p>
      <div data-aos="fade-up" data-aos-delay="200">
        <router-link
          to="/signup"
          class="btn btn-primary btn-lg px-5 py-3 pulse-animation"
        >
          Get Started for Free
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
/* CTA Section */
.cta-section {
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.9) 0%,
    rgba(139, 92, 246, 0.9) 100%
  );
  color: white;
}

/* Dark mode styles */
:deep(.dark-theme) .cta-section {
  background: var(--cta-bg-dark);
  color: var(--cta-text-color-dark);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

:deep(.dark-theme) .cta-section h2,
:deep(.dark-theme) .cta-section p {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:deep(.dark-theme) .btn-primary {
  background-color: white;
  color: var(--primary-color);
  border-color: white;
  box-shadow: var(--btn-primary-shadow-dark);
}

:deep(.dark-theme) .btn-primary:hover {
  background-color: var(--gray-100);
  color: var(--primary-dark);
  border-color: var(--gray-100);
  transform: translateY(-2px);
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
