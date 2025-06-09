<template>
  <footer
    class="landing-footer py-5 mt-5"
    :style="{ 'background-color': isDarkMode ? '#111827' : '' }"
  >
    <div class="dark-footer-overlay"></div>
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="footer-brand d-flex align-items-center mb-3">
            <img
              src="/vite.svg"
              alt="TaskFlow Logo"
              width="30"
              height="30"
              class="me-2"
            />
            <span class="fw-bold fs-4">TaskFlow</span>
          </div>
          <p class="text-muted mb-4">
            Simplify your workflow, boost productivity, and never miss a deadline with our
            intuitive task management platform.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"
                />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="row">
            <div class="col-md-4 mb-4 mb-md-0">
              <h5 class="fw-bold mb-3">Product</h5>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">Features</a></li>
                <li><a href="#" class="footer-link">Pricing</a></li>
                <li><a href="#" class="footer-link">Roadmap</a></li>
                <li><a href="#" class="footer-link">FAQs</a></li>
              </ul>
            </div>

            <div class="col-md-4 mb-4 mb-md-0">
              <h5 class="fw-bold mb-3">Resources</h5>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">Documentation</a></li>
                <li><a href="#" class="footer-link">Tutorials</a></li>
                <li><a href="#" class="footer-link">Blog</a></li>
                <li><a href="#" class="footer-link">Support</a></li>
              </ul>
            </div>

            <div class="col-md-4">
              <h5 class="fw-bold mb-3">Company</h5>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">About</a></li>
                <li><a href="#" class="footer-link">Careers</a></li>
                <li><a href="#" class="footer-link">Privacy</a></li>
                <li><a href="#" class="footer-link">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-4 footer-divider" />
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <p class="mb-3 mb-md-0 text-muted fs-sm">
          © {{ new Date().getFullYear() }} TaskFlow. All rights reserved.
        </p>
        <div class="d-flex gap-3">
          <a href="#" class="text-muted fs-sm footer-bottom-link">Privacy Policy</a>
          <a href="#" class="text-muted fs-sm footer-bottom-link">Terms of Service</a>
          <a href="#" class="text-muted fs-sm footer-bottom-link">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStore } from "../../stores/theme";

// Get theme state from store
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDarkTheme);
</script>

<style scoped>
.landing-footer {
  background-color: var(--light-color);
  color: var(--gray-800);
  position: relative;
  overflow: hidden;
}

.dark-footer-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: -1;
}

:deep(.dark-theme) .dark-footer-overlay {
  display: block;
  background-color: var(--gray-900);
}

.footer-brand {
  color: var(--gray-900);
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--gray-200);
  color: var(--gray-700);
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  display: block;
  padding: 6px 0;
  color: var(--gray-600);
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

.footer-divider {
  opacity: 0.1;
}

.fs-sm {
  font-size: 0.875rem;
}

.footer-bottom-link {
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-bottom-link:hover {
  color: var(--primary-color) !important;
}

/* Dark theme */
:deep(.dark-theme) .landing-footer {
  background-color: var(--gray-900);
  color: var(--text-secondary-dark);
  border-top: 1px solid var(--gray-800);
  position: relative;
  z-index: 1;
}

:deep(.dark-theme) .landing-footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gray-900);
  z-index: -1;
}

:deep(.dark-theme) .footer-brand {
  color: var(--text-primary-dark);
  text-shadow: 0 0 10px rgba(165, 180, 252, 0.3);
}

:deep(.dark-theme) .footer-brand img {
  filter: drop-shadow(0 0 5px rgba(165, 180, 252, 0.5));
}

:deep(.dark-theme) .social-link {
  background-color: rgba(79, 70, 229, 0.15);
  color: var(--primary-lightest);
  border: 1px solid var(--primary-dark);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

:deep(.dark-theme) .social-link:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

:deep(.dark-theme) .footer-link {
  color: var(--gray-300);
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  padding-left: 0;
}

:deep(.dark-theme) .footer-link:hover {
  color: var(--primary-lightest);
  transform: translateX(8px);
  text-shadow: 0 0 8px rgba(165, 180, 252, 0.3);
}

:deep(.dark-theme) .footer-link::before {
  content: "•";
  position: absolute;
  left: -12px;
  opacity: 0;
  color: var(--primary-lighter);
  transition: all 0.3s ease;
}

:deep(.dark-theme) .footer-link:hover::before {
  opacity: 1;
  left: -8px;
}

:deep(.dark-theme) .text-muted {
  color: var(--text-muted-dark) !important;
}

:deep(.dark-theme) h5 {
  color: var(--primary-lightest);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
}

:deep(.dark-theme) h5::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

:deep(.dark-theme) .footer-divider {
  border-color: var(--card-border-dark);
  opacity: 0.3;
}

:deep(.dark-theme) .footer-bottom-link {
  color: var(--gray-400) !important;
}

:deep(.dark-theme) .footer-bottom-link:hover {
  color: var(--primary-lightest) !important;
  text-decoration: underline;
}
</style>
