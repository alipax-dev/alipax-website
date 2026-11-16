/**
 * Navigation - Composant Menu Mobile
 * Gère l'ouverture, la fermeture et l'accessibilité du menu de navigation.
 */

export function initNavigation() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) {
    return;
  }

  // Gestionnaire d'ouverture / fermeture du menu mobile
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Fermeture automatique du menu après sélection d'un lien
  const linkElements = links.querySelectorAll('a');
  linkElements.forEach((link) => {
    link.addEventListener('click', () => {
      if (links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
      }
    });
  });
}
