/**
 * Mobile Menu Toggle
 * Controlar menu hamburger em dispositivos móveis
 */

class MobileMenu {
  constructor() {
    this.nav = document.querySelector('nav');
    this.header = document.querySelector('header');
    this.init();
  }

  init() {
    this.createMenuToggle();
    this.setupNavigation();
  }

  /**
   * Criar botão de menu
   */
  createMenuToggle() {
    if (!this.header || document.getElementById('menu-toggle')) return;

    const menuToggle = document.createElement('button');
    menuToggle.id = 'menu-toggle';
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '☰';

    menuToggle.addEventListener('click', () => this.toggleMenu());

    // Inserir no header antes do último div
    const lastDiv = this.header.querySelector('div:last-child');
    if (lastDiv) {
      this.header.insertBefore(menuToggle, lastDiv);
    } else {
      this.header.appendChild(menuToggle);
    }
  }

  /**
   * Toggle do menu
   */
  toggleMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const isOpen = this.nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
  }

  /**
   * Fechar menu ao clicar em link
   */
  setupNavigation() {
    if (!this.nav) return;

    const navLinks = this.nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.nav.classList.remove('active');
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
});
