/**
 * Page d'accueil — Interactions et comportements
 * Orchestre les composants et animations spécifiques à la landing page ALIPAX.
 */

import { initNavigation } from '../composants/navigation.js?v=1.2.1';

/**
 * Met à jour dynamiquement l'année dans le copyright du footer.
 */
function updateFooterYear() {
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Initialise les animations d'apparition progressive au défilement.
 */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {

    const observer = new IntersectionObserver((entries, obs) => {
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

    reveals.forEach((element) => {
      element.classList.add('show');
    });

  }
}

/**
 * Initialise le carrousel du Socle Technique.
 * Duplique automatiquement le groupe pour assurer
 * un défilement horizontal continu.
 */
function initTechCarousel() {

  const tracks = document.querySelectorAll('.tech-track');

  tracks.forEach((track) => {

    // Éviter une duplication multiple.
    if (track.dataset.initialized === 'true') return;

    const originalGroup = track.querySelector('.tech-group');

    if (!originalGroup) return;

    // Créer une copie du groupe original.
    const duplicateGroup = originalGroup.cloneNode(true);

    // Masquer la copie aux lecteurs d'écran.
    duplicateGroup.setAttribute('aria-hidden', 'true');

    duplicateGroup.querySelectorAll('img').forEach((img) => {
      img.alt = '';
      img.loading = 'eager';
      img.decoding = 'async';
    });

    // Ajouter la copie à la piste.
    track.appendChild(duplicateGroup);

    // Confirmer l'initialisation.
    track.dataset.initialized = 'true';

  });

}

/**
 * Initialisation principale de la page d'accueil.
 */
export function initAccueil() {

  initNavigation();

  updateFooterYear();

  initRevealAnimations();

  initTechCarousel();

}

/**
 * Exécution sécurisée lorsque le DOM est disponible.
 */
if (typeof document !== 'undefined') {

  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', initAccueil, {
      once: true
    });

  } else {

    initAccueil();

  }

}
