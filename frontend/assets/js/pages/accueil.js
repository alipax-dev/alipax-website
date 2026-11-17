/**
 * Page d'accueil — Interactions et comportements
 * Orchestre les composants et animations spécifiques à la landing page ALIPAX.
 */

import { initNavigation } from '../composants/navigation.js';

/**
 * Met à jour dynamiquement l'année dans le copyright du footer
 */
function updateFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Initialise les animations d'apparition progressives au défilement (Scroll Reveal)
 * en tenant compte de la préférence de réduction de mouvement de l'utilisateur.
 */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new window.IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    reveals.forEach((element) => observer.observe(element));
  } else {
    // Si IntersectionObserver n'est pas supporté ou si animations réduites demandées
    reveals.forEach((element) => element.classList.add('show'));
  }
}

/**
 * Initialisation principale de la page d'accueil
 */
export function initAccueil() {
  initNavigation();
  updateFooterYear();
  initRevealAnimations();
}

// Exécution sécurisée dès que le DOM est disponible
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccueil);
  } else {
    initAccueil();
  }
}
/**  =========================
     TECH CAROUSEL - JAVASCRIPT
========================= --> */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tech-track").forEach((track) => {
    if (track.dataset.initialized === "true") return;

    const originalGroup = track.querySelector(".tech-group");
    if (!originalGroup) return;

    const duplicateGroup = originalGroup.cloneNode(true);
    duplicateGroup.setAttribute("aria-hidden", "true");

    // Avoid duplicated images being announced by screen readers.
    duplicateGroup.querySelectorAll("img").forEach((img) => {
      img.setAttribute("alt", "");
    });

    track.appendChild(duplicateGroup);
    track.dataset.initialized = "true";
  });
});

