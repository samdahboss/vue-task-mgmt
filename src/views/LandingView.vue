<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <LandingHero />

    <!-- Features Section -->
    <LandingFeatures />

    <!-- Stats Section -->
    <LandingStats />

    <!-- Testimonials Section -->
    <LandingTestimonials />

    <!-- CTA Section -->
    <LandingCta />

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useThemeStore } from "../stores/theme";
import LandingHero from "../components/landing/LandingHero.vue";
import LandingFeatures from "../components/landing/LandingFeatures.vue";
import LandingStats from "../components/landing/LandingStats.vue";
import LandingTestimonials from "../components/landing/LandingTestimonials.vue";
import LandingCta from "../components/landing/LandingCta.vue";
import LandingFooter from "../components/landing/LandingFooter.vue";

const router = useRouter();
const auth = useAuthStore();
const theme = useThemeStore();

// Toggle theme function
const toggleTheme = () => {
  theme.toggleTheme();
};

onMounted(() => {
  // Initialize theme
  theme.initialize();

  // Check if user is already logged in and redirect if necessary
  if (auth.user) {
    router.push("/dashboard");
  }

  // Apply smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
  position: relative;
}

/* Theme toggle button */
.theme-toggle-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--gray-800);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* Dark theme styles */
:deep(.dark-theme) .theme-toggle {
  background-color: var(--gray-800);
  color: var(--gray-200);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

:deep(.dark-theme) {
  --bs-body-bg: var(--gray-900);
  --bs-body-color: var(--gray-300);
}

:deep(.dark-theme) .btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

:deep(.dark-theme) .btn-outline-primary {
  color: var(--primary-lightest);
  border-color: var(--primary-lightest);
}

:deep(.dark-theme) .btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: white;
}

:deep(.dark-theme) .text-muted {
  color: var(--gray-400) !important;
}

:deep(.dark-theme) .card,
:deep(.dark-theme) .feature-card {
  background-color: var(--gray-800);
  border-color: var(--gray-700);
}

:deep(.dark-theme) h1,
:deep(.dark-theme) h2,
:deep(.dark-theme) h3,
:deep(.dark-theme) h4,
:deep(.dark-theme) h5,
:deep(.dark-theme) h6,
:deep(.dark-theme) .fw-bold {
  color: white;
}
</style>
