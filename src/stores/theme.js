import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkTheme = ref(false);

  function initialize() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      isDarkTheme.value = true;
      applyDarkTheme();
    } else {
      isDarkTheme.value = false;
      applyLightTheme();
    }
  }

  function toggleTheme() {
    isDarkTheme.value = !isDarkTheme.value;

    if (isDarkTheme.value) {
      applyDarkTheme();
      localStorage.setItem("theme", "dark");
    } else {
      applyLightTheme();
      localStorage.setItem("theme", "light");
    }
  }

  function applyDarkTheme() {
    document.body.classList.add("bg-dark", "text-light");
  }

  function applyLightTheme() {
    document.body.classList.remove("bg-dark", "text-light");
  }

  return {
    isDarkTheme,
    initialize,
    toggleTheme,
  };
});
