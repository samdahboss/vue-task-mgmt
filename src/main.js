import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Added Bootstrap JS
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "./style.css";
import "./assets/dark-theme.css"; // Import custom dark theme styles
import "./assets/landing-dark-theme.css"; // Import landing page dark theme styles
import "./assets/dark-mode-overrides.css"; // Import additional dark mode overrides
import "./assets/footer-dark-fix.css"; // Import footer dark mode fixes

// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
