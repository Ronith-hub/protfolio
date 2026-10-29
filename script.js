/* ============================================================
   script.js - Beginner-Friendly Interactive Features
   
   Features included:
   (1) Dark Mode Toggle Button (with memory using localStorage)
   (2) Smooth Scrolling when clicking navigation links
   (3) "Back to Top" button that appears when scrolling down
   ============================================================ */

// Wait until the entire HTML document is loaded before running code
document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio JavaScript loaded successfully!");

  // ==========================================================
  // PART 1: DARK MODE TOGGLE
  // ==========================================================
  // Find the dark mode button in our header
  const themeToggleBtn = document.getElementById("themeToggle");

  // Check if the user previously saved a theme preference in localStorage
  const savedTheme = localStorage.getItem("portfolio-theme");

  // If the user previously chose dark mode, apply it right away
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = "☀️ Light Mode";
    }
  }

  // When the user clicks the dark mode button:
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      // Toggle the 'dark-mode' CSS class on the <body>
      document.body.classList.toggle("dark-mode");

      // Check if dark mode is now active
      const isDarkMode = document.body.classList.contains("dark-mode");

      // Update button text and icon
      themeToggleBtn.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";

      // Save user choice in the browser's localStorage memory
      localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light");
    });
  }

  // ==========================================================
  // PART 2: SMOOTH SCROLLING FOR NAVIGATION LINKS
  // ==========================================================
  // Find all anchor links whose href starts with "#" (like href="#about")
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Get the target section ID (e.g. "#about")
      const targetId = this.getAttribute("href");

      // Make sure it's a valid section ID on the page (not just "#")
      if (targetId && targetId !== "#") {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Prevent the sudden default browser page jump
          event.preventDefault();

          // Smoothly scroll the viewport to the target section
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // ==========================================================
  // PART 3: "BACK TO TOP" BUTTON
  // ==========================================================
  // Find the floating button element
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    // Listen for the user scrolling the page
    window.addEventListener("scroll", function () {
      // Check if user has scrolled down more than 300 pixels
      if (window.scrollY > 300) {
        // Add the 'visible' class so the button fades in
        backToTopBtn.classList.add("visible");
      } else {
        // Remove 'visible' when near the top of the page
        backToTopBtn.classList.remove("visible");
      }
    });

    // When the user clicks the "Back to Top" button:
    backToTopBtn.addEventListener("click", function () {
      // Smoothly scroll back to the very top (y = 0)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
