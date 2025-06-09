<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6 hero-content" data-aos="fade-right" data-aos-delay="100">
            <div class="logo-animation">
              <img src="/vite.svg" alt="TaskFlow Logo" width="80" class="mb-4 floating" />
            </div>
            <h1 class="display-4 fw-bold mb-3">
              Manage Tasks with <span class="text-gradient">TaskFlow</span>
            </h1>
            <p class="lead mb-4">
              Simplify your workflow, boost productivity, and never miss a deadline with
              our intuitive task management platform.
            </p>
            <div class="d-flex gap-3 hero-buttons">
              <router-link
                to="/signup"
                class="btn btn-primary btn-lg px-4 py-2 pulse-animation"
              >
                Get Started
              </router-link>
              <router-link to="/login" class="btn btn-outline-primary btn-lg px-4 py-2">
                Log In
              </router-link>
            </div>
          </div>
          <div
            class="col-lg-6 d-none d-lg-block"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div class="hero-image">
              <div class="task-card task-card-1">
                <div class="task-header">
                  <div class="task-priority high"></div>
                  <div class="task-date">June 9, 2025</div>
                </div>
                <div class="task-title">Complete project proposal</div>
                <div class="task-progress">
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style="width: 75%"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="task-card task-card-2">
                <div class="task-header">
                  <div class="task-priority medium"></div>
                  <div class="task-date">June 12, 2025</div>
                </div>
                <div class="task-title">Team meeting preparation</div>
                <div class="task-progress">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      style="width: 45%"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="task-card task-card-3">
                <div class="task-header">
                  <div class="task-priority low"></div>
                  <div class="task-date">June 15, 2025</div>
                </div>
                <div class="task-title">Review client feedback</div>
                <div class="task-progress">
                  <div class="progress">
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      style="width: 20%"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,144C672,171,768,213,864,213.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container py-5">
      <h2 class="text-center mb-5 fw-bold" data-aos="fade-up">
        Why Choose <span class="text-gradient">TaskFlow</span>?
      </h2>
      <div class="row g-4 py-4">
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="feature-card h-100 p-4">
            <div class="feature-icon mb-4">
              <div class="icon-bg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  class="bi bi-check2-circle text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
                  />
                  <path
                    d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="h5 fw-bold">Task Organization</h3>
            <p class="text-muted">
              Create, prioritize, and categorize tasks to keep your workflow structured
              and efficient.
            </p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="feature-card h-100 p-4">
            <div class="feature-icon mb-4">
              <div class="icon-bg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  class="bi bi-graph-up text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="h5 fw-bold">Progress Tracking</h3>
            <p class="text-muted">
              Monitor your productivity with intuitive dashboards and completion
              statistics.
            </p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div class="feature-card h-100 p-4">
            <div class="feature-icon mb-4">
              <div class="icon-bg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  class="bi bi-calendar-check text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="h5 fw-bold">Deadline Management</h3>
            <p class="text-muted">
              Set due dates and never miss an important deadline with smart reminders.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
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

    <!-- Testimonials Section -->
    <div class="container py-5">
      <h2 class="text-center mb-5 fw-bold" data-aos="fade-up">What Our Users Say</h2>
      <div class="row g-4">
        <div class="col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>
                "TaskFlow has completely transformed how our team manages projects. The
                intuitive interface and powerful analytics have boosted our productivity
                by 40%!"
              </p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <div class="avatar-placeholder">JS</div>
              </div>
              <div class="author-info">
                <div class="author-name">Jane Smith</div>
                <div class="author-title">Project Manager</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>
                "I've tried many task management tools, but TaskFlow stands out with its
                simplicity and powerful features. I can finally keep track of all my
                deadlines effortlessly."
              </p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <div class="avatar-placeholder">MD</div>
              </div>
              <div class="author-info">
                <div class="author-name">Mark Davis</div>
                <div class="author-title">Freelance Designer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
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
.landing-page {
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  padding: 100px 0 150px;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.15) 0%,
    rgba(139, 92, 246, 0.15) 100%
  );
}

.hero-wave {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.text-gradient {
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Hero animations */
.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
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

/* Hero cards */
.hero-image {
  position: relative;
  height: 400px;
}

.task-card {
  position: absolute;
  width: 260px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform-origin: center;
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.task-card-1 {
  top: 50px;
  left: 20px;
  z-index: 3;
  animation: cardFloat 4s ease-in-out infinite;
}

.task-card-2 {
  top: 120px;
  right: 10px;
  z-index: 2;
  animation: cardFloat 4s ease-in-out infinite 0.5s;
}

.task-card-3 {
  bottom: 50px;
  left: 60px;
  z-index: 1;
  animation: cardFloat 4s ease-in-out infinite 1s;
}

@keyframes cardFloat {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.task-priority {
  width: 50px;
  height: 8px;
  border-radius: 4px;
}

.task-priority.high {
  background-color: var(--danger-color);
}

.task-priority.medium {
  background-color: var(--primary-color);
}

.task-priority.low {
  background-color: var(--info-color);
}

.task-date {
  font-size: 12px;
  color: #6c757d;
}

.task-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 15px;
}

.task-progress {
  margin-top: 15px;
}

/* Feature cards */
.feature-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  text-align: center;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.icon-bg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(79, 70, 229, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.feature-card:hover .icon-bg {
  background-color: rgba(79, 70, 229, 0.2);
  transform: scale(1.1);
}

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

/* Testimonials */
.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  font-style: italic;
  color: #495057;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  margin-right: 15px;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.author-name {
  font-weight: 600;
  color: #212529;
}

.author-title {
  font-size: 0.9rem;
  color: #6c757d;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.9) 0%,
    rgba(139, 92, 246, 0.9) 100%
  );
  color: white;
}

/* Media Queries */
@media (max-width: 992px) {
  .hero-section {
    padding: 60px 0 100px;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .stat-value {
    font-size: 2.5rem;
  }
}
</style>
