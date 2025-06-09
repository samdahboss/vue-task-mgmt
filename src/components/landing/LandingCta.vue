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
