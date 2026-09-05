// ---------------------------------------------------------
// Ace's Portfolio — interactivity
// 1. Highlight the current section in the nav while scrolling
// 2. Toggle the nav on small screens
// 3. Copy phone/email to clipboard on click
// 4. Keep the footer year current
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  initScrollSpy();
  initNavToggle();
  initCopyButtons();
  setFooterYear();
});

// 1. Scrollspy: mark the nav link for the section in view as active
function initScrollSpy() {
  var sections = document.querySelectorAll(".entry");
  var navLinks = document.querySelectorAll(".nav a");

  if (!sections.length || !navLinks.length) return;

  var linkFor = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").replace("#", "");
    linkFor[id] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute("id");
        var link = linkFor[id];
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

// 2. Mobile nav toggle: show/hide the nav list on small screens
function initNavToggle() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.textContent = isOpen ? "Close" : "Menu";
  });

  // Close the nav after picking a link (small screens only)
  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  });
}

// 3. Copy contact details to the clipboard with brief feedback
function initCopyButtons() {
  var buttons = document.querySelectorAll(".copy-btn");
  if (!buttons.length) return;

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy");
      if (!value) return;

      var showCopied = function () {
        var original = button.textContent;
        button.textContent = "Copied";
        button.classList.add("copied");
        setTimeout(function () {
          button.textContent = original;
          button.classList.remove("copied");
        }, 1500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(showCopied);
      } else {
        // Fallback for browsers without the Clipboard API
        var temp = document.createElement("textarea");
        temp.value = value;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        showCopied();
      }
    });
  });
}

// 4. Footer year
function setFooterYear() {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
