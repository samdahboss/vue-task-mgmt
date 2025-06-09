<template>
  <div class="landing-page">
    <div class="hero-section">
      <div class="container py-5 text-center">
        <img src="/vite.svg" alt="TaskFlow Logo" width="80" class="mb-4" />
        <h1 class="display-4 fw-bold mb-3">TaskFlow</h1>
        <p class="lead mb-4 mx-auto" style="max-width: 600px">
          Simplify your workflow, boost productivity, and never miss a deadline with our intuitive task management platform.
        </p>
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/signup" class="btn btn-primary btn-lg px-4 py-2">Get Started</router-link>
          <router-link to="/login" class="btn btn-outline-primary btn-lg px-4 py-2">Log In</router-link>
        </div>
      </div>
    </div>
    
    <div class="container py-5">
      <div class="row g-4 py-4">
        <div class="col-md-4">
          <div class="card h-100 p-4 text-center">
            <div class="feature-icon mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-check2-circle text-primary" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
              </svg>
            </div>
            <h3 class="h5 fw-bold">Task Organization</h3>
            <p class="text-muted">Create, prioritize, and categorize tasks to keep your workflow structured and efficient.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 p-4 text-center">
            <div class="feature-icon mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-graph-up text-primary" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
              </svg>
            </div>
            <h3 class="h5 fw-bold">Progress Tracking</h3>
            <p class="text-muted">Monitor your productivity with intuitive dashboards and completion statistics.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 p-4 text-center">
            <div class="feature-icon mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-calendar-check text-primary" viewBox="0 0 16 16">
                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
            </div>
            <h3 class="h5 fw-bold">Deadline Management</h3>
            <p class="text-muted">Set due dates and never miss an important deadline with smart reminders.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Landing page for onboarding
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 0 0 30% 30% / 10%;
  margin-bottom: 2rem;
}
</style>
