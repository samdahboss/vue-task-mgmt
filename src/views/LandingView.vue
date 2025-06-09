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
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import LandingHero from "../components/landing/LandingHero.vue";
import LandingFeatures from "../components/landing/LandingFeatures.vue";
import LandingStats from "../components/landing/LandingStats.vue";
import LandingTestimonials from "../components/landing/LandingTestimonials.vue";
import LandingCta from "../components/landing/LandingCta.vue";

const router = useRouter();
const auth = useAuthStore();

onMounted(() => {
  // Check if user is already logged in and redirect if necessary
  if (auth.user) {
    router.push("/dashboard");
  }
});
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
}
</style>
