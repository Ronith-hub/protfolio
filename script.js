// ==========================================================================
// script.js - Simple, Beginner-Friendly Interactive JavaScript
// 
// Features Included:
// 1. Dark Mode Toggle (with LocalStorage memory & header button)
// 2. Smooth Scrolling for all navigation links
// 3. Floating "Back to Top" Button that appears on scroll
// 4. One-Click Email Copy to Clipboard
// 5. Automatic Copyright Year Updater
// ==========================================================================

// Wait until the HTML document has fully loaded before running code
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio scripts initialized successfully!");

  // ------------------------------------------------------------------------
  // PART 1: DARK MODE TOGGLE (With LocalStorage Memory)
  // ------------------------------------------------------------------------
  
  // Find or create the theme toggle button in the header
  const navContainer = document.querySelector(".nav-container") || document.querySelector("header");
  let themeToggleBtn = document.getElementById("theme-toggle-btn");

  if (!themeToggleBtn && navContainer) {
    // Create button dynamically if not in the original HTML
    themeToggleBtn = document.createElement("button");
    themeToggleBtn.id = "theme-toggle-btn";
    themeToggleBtn.className = "btn-theme-toggle";
    themeToggleBtn.setAttribute("aria-label", "Toggle dark/light theme");
    themeToggleBtn.innerHTML = "🌙 Dark";
    navContainer.appendChild(themeToggleBtn);
  }

  // Check if user previously saved a theme preference in their browser
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) themeToggleBtn.innerHTML = "☀️ Light";
  }

  // When the theme button is clicked, toggle dark mode on/off
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");

      // Save user choice so it persists across page refreshes
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

      // Update button text and icon
      themeToggleBtn.innerHTML = isDark ? "☀️ Light" : "🌙 Dark";
    });
  }

  // ------------------------------------------------------------------------
  // PART 2: SMOOTH SCROLLING FOR NAVIGATION LINKS
  // ------------------------------------------------------------------------
  
  // Select all links that start with "#" (like href="#about", href="#projects")
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      
      // If the link is just "#", scroll right to the top
      if (targetId === "#" || targetId === "#home") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        event.preventDefault(); // Stop standard abrupt browser jump
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // PART 3: FLOATING "BACK TO TOP" BUTTON (Shows on Scroll)
  // ------------------------------------------------------------------------

  // Create the floating back to top button element
  let backToTopBtn = document.getElementById("floating-back-to-top");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "floating-back-to-top";
    backToTopBtn.className = "floating-top-btn";
    backToTopBtn.setAttribute("aria-label", "Scroll back to top");
    backToTopBtn.innerHTML = "&uarr;";
    document.body.appendChild(backToTopBtn);
  }

  // Listen to window scroll event: Show button after scrolling 300px down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Click event: Smoothly glide back to the top of the page
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ------------------------------------------------------------------------
  // PART 4: EMAIL 1-CLICK COPY TO CLIPBOARD
  // ------------------------------------------------------------------------
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const emailAddress = "alex.morgan.cse@example.com";

      navigator.clipboard.writeText(emailAddress).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied! ✓";
        copyBtn.style.backgroundColor = "#dcfce7";
        copyBtn.style.color = "#166534";

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = "";
          copyBtn.style.color = "";
        }, 2200);
      }).catch(err => {
        console.error("Copy failed:", err);
      });
    });
  }

  // ------------------------------------------------------------------------
  // PART 5: DYNAMIC COPYRIGHT YEAR
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});