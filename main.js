document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initYear();
  initHeader();
  initFaq();
  initQuoteForm();
  initReveal();
});

function initIcons() {
  const uses = Array.from(document.querySelectorAll("use")).filter((use) => {
    const href = use.getAttribute("href") || use.getAttribute("xlink:href") || "";
    return href.startsWith("icons.svg#");
  });

  if (!uses.length) {
    return;
  }

  if (!document.querySelector(".icon-sprite")) {
    const spriteMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
        <symbol id="phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.2 19.2 0 0 1-5.9-5.9A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.3a2 2 0 0 1 2.1-.4c.8.4 1.7.6 2.6.7A2 2 0 0 1 22 16.9Z"/>
        </symbol>
        <symbol id="mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="m3 7 9 6 9-6"/>
        </symbol>
        <symbol id="camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>
          <path d="m8 7 1.5-3h5L16 7"/>
          <circle cx="12" cy="12" r="3.5"/>
        </symbol>
        <symbol id="alarm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.3 3.4 7.4 6.3"/>
          <path d="m16.6 6.3-2.9-2.9"/>
          <path d="M6.5 17h11"/>
          <path d="M7 17a5 5 0 1 1 10 0"/>
          <path d="M8.4 20h7.2"/>
        </symbol>
        <symbol id="intercom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="2"/>
          <path d="M9 8h6"/>
          <path d="M9 12h6"/>
          <circle cx="12" cy="17" r="1"/>
        </symbol>
        <symbol id="network" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 18h14"/>
          <path d="M6 18V9l6-4 6 4v9"/>
          <path d="M12 5v13"/>
          <path d="M8 11h8"/>
        </symbol>
        <symbol id="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3 5 6v6c0 5 3.4 8.9 7 10 3.6-1.1 7-5 7-10V6l-7-3Z"/>
          <path d="m9 12 2 2 4-4"/>
        </symbol>
        <symbol id="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 21s6-4.6 6-10a6 6 0 1 0-12 0c0 5.4 6 10 6 10Z"/>
          <circle cx="12" cy="11" r="2.5"/>
        </symbol>
        <symbol id="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m5 12 4.2 4.2L19 6.5"/>
        </symbol>
        <symbol id="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="m13 5 7 7-7 7"/>
        </symbol>
      </svg>
    `;
    const spriteHost = document.createElement("div");
    spriteHost.className = "icon-sprite";
    spriteHost.setAttribute("aria-hidden", "true");
    spriteHost.innerHTML = spriteMarkup;
    document.body.prepend(spriteHost);
  }

  uses.forEach((use) => {
    const href = use.getAttribute("href") || use.getAttribute("xlink:href");

    if (!href || !href.includes("#")) {
      return;
    }

    const symbolId = href.slice(href.indexOf("#"));
    use.setAttribute("href", symbolId);
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", symbolId);
  });
}

function initYear() {
  const yearTarget = document.getElementById("year");
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

function initHeader() {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!header) {
    return;
  }

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (!toggle || !nav) {
    return;
  }

  const setMenuState = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("nav-open", isOpen);
  };

  const closeMenu = () => setMenuState(false);

  toggle.addEventListener("click", () => {
    const willOpen = !nav.classList.contains("is-open");
    setMenuState(willOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) {
      return;
    }

    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const summary = item.querySelector("summary");

    if (!summary) {
      return;
    }

    const syncState = () => {
      summary.setAttribute("aria-expanded", item.open ? "true" : "false");
    };

    syncState();
    item.addEventListener("toggle", syncState);
  });
}

function initQuoteForm() {
  const form = document.getElementById("quote-form");

  if (!form) {
    return;
  }

  const errorMessage = document.getElementById("quote-form-error");
  const successMessage = document.getElementById("quote-form-success");
  const serviceInputs = Array.from(form.querySelectorAll('input[name="services"]'));

  const toggleMessages = ({ showError = false, showSuccess = false } = {}) => {
    if (errorMessage) {
      errorMessage.hidden = !showError;
    }

    if (successMessage) {
      successMessage.hidden = !showSuccess;
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    toggleMessages();

    const hasService = serviceInputs.some((input) => input.checked);

    if (!form.reportValidity() || !hasService) {
      toggleMessages({ showError: true });
      return;
    }

    const formData = new FormData(form);
    const services = serviceInputs.filter((input) => input.checked).map((input) => input.value);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const propertyType = String(formData.get("propertyType") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Quote request from ${name} - ${propertyType || "Property"} in ${location}`;
    const bodyLines = [
      "Hello FJ Security Solutions,",
      "",
      "I would like to request a quote.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Property location: ${location}`,
      `Property type: ${propertyType}`,
      `Services of interest: ${services.join(", ")}`,
      "",
      "Project details:",
      message,
      "",
      "Regards,",
      name,
    ];

    const mailtoUrl = `mailto:contact@fjsecuritysolutions.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    toggleMessages({ showSuccess: true });
    window.location.href = mailtoUrl;
  });

  form.addEventListener("input", () => {
    toggleMessages();
  });

  form.addEventListener("change", () => {
    toggleMessages();
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  items.forEach((item) => observer.observe(item));
}
