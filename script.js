const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const config = window.GSA_SITE_CONFIG || {};
const school = config.school || {};
const images = config.images || {};
const enrollment = config.enrollment || {};

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const setText = (selector, value) => {
  if (!value) return;
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const setHref = (selector, value) => {
  if (!value) return;
  const element = document.querySelector(selector);
  if (element) element.href = value;
};

const renderLogo = () => {
  document.querySelectorAll("[data-logo]").forEach((element) => {
    if (images.logo) {
      element.innerHTML = `<img src="${images.logo}" alt="${school.initials || "GSA"} logo" />`;
      return;
    }

    element.textContent = school.initials || "GSA";
  });
};

const renderCards = (selector, items, cardClass, iconClass) => {
  const container = document.querySelector(selector);
  if (!container || !Array.isArray(items) || items.length === 0) return;

  container.innerHTML = items
    .map(
      (item) => `
        <article class="${cardClass}">
          <span class="${iconClass}" aria-hidden="true">${item.icon || item.number || ""}</span>
          <h3>${item.title || ""}</h3>
          ${item.meta ? `<p class="card-meta">${item.meta}</p>` : ""}
          <p>${item.description || ""}</p>
        </article>
      `
    )
    .join("");
};

const applySiteConfig = () => {
  document.title = `${school.shortName || "Good Shepherd Academy"} | Panabo City`;

  if (images.heroBackground) {
    document.querySelector(".hero").style.backgroundImage = `
      linear-gradient(135deg, rgba(123, 28, 46, 0.94) 0%, rgba(123, 28, 46, 0.88) 42%, rgba(26, 58, 143, 0.92) 100%),
      url("${images.heroBackground}")
    `;
  }

  setText("#brand-name", school.shortName);
  setText("#school-name", school.name);
  setText("#tagline", school.tagline);
  setText("#school-id", school.schoolId ? `School ID: ${school.schoolId}` : "");
  setText("#quick-phone", school.phone);
  setText("#quick-email", school.email);
  setText("#quick-facebook-text", school.facebookLabel || school.facebook);
  setText("#footer-name", school.shortName);
  setText("#footer-address", school.address);
  setText("#footer-school-id", school.schoolId ? `School ID: ${school.schoolId}` : "");
  setText("#footer-phone", school.phone);
  setText("#footer-email", school.email);
  setText("#footer-facebook", school.facebookLabel || school.facebook);
  setText("#copyright", `(c) 2026 ${school.shortName || "Good Shepherd Academy"}. All rights reserved.`);

  setHref("#footer-phone", school.phone ? `tel:${school.phone}` : "");
  setHref("#footer-email", school.email ? `mailto:${school.email}` : "");
  setHref("#footer-facebook", school.facebook);
  setHref("#quick-facebook", school.facebook);
  setText("#enrollment-phone-text", school.phone);
  setText("#enrollment-email-text", school.email);
  setText("#enrollment-facebook-text", school.facebookLabel || school.facebook);
  setHref("#enrollment-phone", school.phone ? `tel:${school.phone}` : "");
  setHref("#enrollment-email", school.email ? `mailto:${school.email}` : "");
  setHref("#enrollment-facebook", school.facebook);

  setText("#hero-badge", config.hero?.badge);
  setText("#hero-lead", config.hero?.lead);
  setText("#hero-primary-cta", enrollment.formCta);
  setHref("#hero-primary-cta", enrollment.googleFormUrl);
  setText("#hero-secondary-cta", config.hero?.secondaryCta);
  setText("#hero-school-year", enrollment.schoolYear);
  setText("#hero-panel-title", enrollment.title);

  const programSummary = config.programs?.map((program) => program.title).join(", ");
  setText("#hero-panel-summary", programSummary ? `${programSummary}.` : "");

  setText("#enrollment-title", enrollment.title);
  setText("#enrollment-cta", enrollment.cta);
  setText("#contact-panel-title", enrollment.panelTitle);
  setText("#contact-enroll-cta", enrollment.formCta);
  setHref("#contact-enroll-cta", enrollment.googleFormUrl);
  setText("#footer-enroll-cta", enrollment.formCta);
  setHref("#footer-enroll-cta", enrollment.googleFormUrl);

  renderLogo();
  renderCards("#program-cards", config.programs, "info-card", "card-icon");
  renderCards("#feature-cards", config.features, "feature-card", "feature-icon");
};

applySiteConfig();
