// Función simple de smooth scroll solo para enlaces de la home
function initHomePageSmoothScroll() {
  // Solo ejecutar en la página principal
  if (window.location.pathname !== '/') {
    return;
  }

  // Función para scroll suave a elementos específicos
  function scrollToElement(targetId) {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Manejar clics en enlaces anchor solo en la navegación
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    
    // Solo manejar enlaces que están dentro del nav
    if (link && link.closest('nav')) {
      e.preventDefault();
      const target = link.getAttribute('href');
      scrollToElement(target);
    }
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePageSmoothScroll);
} else {
  initHomePageSmoothScroll();
}

// Para compatibilidad con Astro SPA navigation
document.addEventListener('astro:page-load', initHomePageSmoothScroll);