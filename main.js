(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav toggle */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.getElementById("mobile-nav");
    if (!toggle || !panel) return;

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
    }
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
    }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        close();
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
  }

  /* Smooth scroll for on-page anchors */
  function initAnchorScroll() {
    if (reduceMotion) return;
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /* Scroll-triggered reveal */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  /* Sticky call bar show/hide */
  function initCallBar() {
    var bar = document.querySelector(".call-bar");
    if (!bar) return;
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      if (y > lastY && y > 160) {
        bar.classList.add("is-hidden");
      } else {
        bar.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* Quote form -> mailto */
  function initQuoteForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;
    var status = form.querySelector(".form-status");

    function setError(field, message) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".field-error");
      if (message) {
        wrapper.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        wrapper.classList.remove("has-error");
      }
    }

    function validate() {
      var valid = true;
      var required = form.querySelectorAll("[required]");
      required.forEach(function (field) {
        var value = (field.value || "").trim();
        if (field.type === "checkbox") return;
        if (!value) {
          setError(field, "Please fill in this field.");
          valid = false;
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setError(field, "Please enter a valid email address.");
          valid = false;
        } else {
          setError(field, "");
        }
      });

      var serviceBoxes = form.querySelectorAll('input[name="services"]:checked');
      var serviceGroup = form.querySelector(".checkbox-group");
      if (serviceGroup && serviceBoxes.length === 0) {
        var groupError = serviceGroup.parentElement.querySelector(".field-error");
        if (groupError) {
          groupError.style.display = "block";
          groupError.textContent = "Select at least one service.";
        }
        valid = false;
      } else if (serviceGroup) {
        var ge = serviceGroup.parentElement.querySelector(".field-error");
        if (ge) ge.style.display = "none";
      }
      return valid;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) {
        status.classList.remove("is-visible", "is-success", "is-error");
      }
      if (!validate()) {
        if (status) {
          status.textContent = "Please check the highlighted fields and try again.";
          status.classList.add("is-visible", "is-error");
        }
        return;
      }

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var location = (data.get("location") || "").toString().trim();
      var propertyType = (data.get("propertyType") || "").toString().trim();
      var services = data.getAll("services").join(", ");
      var details = (data.get("details") || "").toString().trim();

      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (phone || "Not provided"),
        "Property location: " + location,
        "Property type: " + propertyType,
        "Services of interest: " + (services || "Not specified"),
        "",
        "Project details:",
        details
      ];

      var subject = "Quote request - " + (services || "Security services") + " - " + location;
      var mailto =
        "mailto:contact@fjsecuritysolutions.com.au" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      if (status) {
        status.textContent = "Your email app should now be opening with your quote request ready to send.";
        status.classList.add("is-visible", "is-success");
      }
    });
  }

  /* Hero quick-quote form -> mailto (same no-backend pattern as the main quote form) */
  function initHeroQuoteForm() {
    var form = document.getElementById("hero-quote-form");
    if (!form) return;
    var status = form.querySelector(".form-status");

    function setError(field, message) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".field-error");
      if (message) {
        wrapper.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        wrapper.classList.remove("has-error");
      }
    }

    function validate() {
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var value = (field.value || "").trim();
        if (!value) {
          setError(field, "Please fill in this field.");
          valid = false;
        } else {
          setError(field, "");
        }
      });
      return valid;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) {
        status.classList.remove("is-visible", "is-success", "is-error");
      }
      if (!validate()) {
        if (status) {
          status.textContent = "Please check the highlighted fields and try again.";
          status.classList.add("is-visible", "is-error");
        }
        return;
      }

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();

      var bodyLines = [
        "Name: " + name,
        "Phone: " + phone,
        "Service needed: " + (service || "Not specified"),
        "",
        "Sent from the quick quote form on the homepage."
      ];

      var subject = "Quote request - " + (service || "Security services");
      var mailto =
        "mailto:contact@fjsecuritysolutions.com.au" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      if (status) {
        status.textContent = "Your email app should now be opening with your quote request ready to send.";
        status.classList.add("is-visible", "is-success");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initAnchorScroll();
    initReveal();
    initCallBar();
    initQuoteForm();
    initHeroQuoteForm();
  });
})();
