<template>
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
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
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

/* Media Queries */
@media (max-width: 992px) {
  .hero-section {
    padding: 60px 0 100px;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }
}
</style>
