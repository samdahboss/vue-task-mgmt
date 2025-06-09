<template>
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
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
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

/* Dark mode styles */
:deep(.dark-theme) .testimonial-card {
  background-color: var(--card-testimonial-bg-dark);
  border-color: var(--card-testimonial-border-dark);
  box-shadow: var(--card-shadow-dark);
}

:deep(.dark-theme) .testimonial-card:hover {
  box-shadow: var(--card-shadow-hover-dark);
  border-color: var(--primary-light);
}

:deep(.dark-theme) .testimonial-content {
  color: var(--card-testimonial-content-dark);
}

:deep(.dark-theme) .author-name {
  color: var(--text-primary-dark);
}

:deep(.dark-theme) .author-title {
  color: var(--text-muted-dark);
}

:deep(.dark-theme) .avatar-placeholder {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
