/**
 * Acessibilidade (A11y)
 * Melhorias de acessibilidade e navegação por teclado
 */

class Accessibility {
  constructor() {
    this.init();
  }

  init() {
    this.improveFormAccessibility();
    this.setupKeyboardNavigation();
    this.addAriaLabels();
    this.setupSkipLinks();
  }

  /**
   * Melhorar acessibilidade de formulários
   */
  improveFormAccessibility() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      form.setAttribute('aria-label', `Formulário ${form.querySelector('h2')?.textContent || 'de entrada'}`);

      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach((input) => {
        if (!input.id) {
          input.id = `input-${Math.random().toString(36).substr(2, 9)}`;
        }

        const label = form.querySelector(`label[for="${input.id}"]`);
        if (!label && input.previousElementSibling?.tagName === 'LABEL') {
          input.previousElementSibling.setAttribute('for', input.id);
        }

        // Adicionar aria-required
        if (input.hasAttribute('required')) {
          input.setAttribute('aria-required', 'true');
        }

        // Adicionar aria-describedby para mensagens de erro
        const errorElement = document.querySelector(`[data-error="${input.name}"]`);
        if (errorElement && !errorElement.id) {
          errorElement.id = `error-${input.name}`;
          input.setAttribute('aria-describedby', `error-${input.name}`);
        }
      });

      const buttons = form.querySelectorAll('button');
      buttons.forEach((btn) => {
        if (!btn.textContent.trim()) {
          btn.setAttribute('aria-label', 'Enviar formulário');
        }
      });
    });
  }

  /**
   * Configurar navegação por teclado
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Tab: Focar próximo elemento
      if (e.key === 'Tab') {
        // Navegação natural do tab
      }

      // Enter: Ativar botões com space/enter
      if (e.key === 'Enter') {
        if (e.target.tagName === 'BUTTON' && !e.target.closest('form')) {
          e.target.click();
        }
      }

      // Escape: Fechar menus
      if (e.key === 'Escape') {
        const menu = document.querySelector('nav.active');
        if (menu) {
          menu.classList.remove('active');
          const menuToggle = document.getElementById('menu-toggle');
          if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
          }
        }
      }

      // Alt + H: Ir para Home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        const homeLink = document.querySelector('nav a[href*="index"]');
        if (homeLink) homeLink.click();
      }
    });
  }

  /**
   * Adicionar ARIA labels
   */
  addAriaLabels() {
    // Links de navegação
    document.querySelectorAll('nav a').forEach((link) => {
      if (!link.hasAttribute('aria-label')) {
        link.setAttribute('aria-label', `Ir para ${link.textContent}`);
      }
    });

    // Tabelas
    document.querySelectorAll('table').forEach((table, index) => {
      if (!table.hasAttribute('aria-label')) {
        table.setAttribute('aria-label', `Tabela de dados ${index + 1}`);
      }
    });

    // Seções
    document.querySelectorAll('section').forEach((section) => {
      if (!section.hasAttribute('aria-label') && section.querySelector('h2')) {
        section.setAttribute('aria-label', section.querySelector('h2').textContent);
      }
    });

    // Cartas (cards)
    document.querySelectorAll('.card').forEach((card) => {
      if (!card.hasAttribute('aria-label') && card.querySelector('h3')) {
        card.setAttribute('aria-label', card.querySelector('h3').textContent);
      }
    });
  }

  /**
   * Skip Links (pular para conteúdo principal)
   */
  setupSkipLinks() {
    if (document.getElementById('skip-to-content')) return;

    const skipLink = document.createElement('a');
    skipLink.id = 'skip-to-content';
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para conteúdo principal';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--accent);
      color: var(--bg);
      padding: 8px 16px;
      text-decoration: none;
      border-radius: 0 0 8px 0;
      z-index: 100;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.prepend(skipLink);

    // Adicionar ID ao main
    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = 'main-content';
      main.setAttribute('role', 'main');
    }
  }

  /**
   * Verificar contraste e avisar se ruim
   */
  checkContrast() {
    // Função para calcular luminância
    const getLuminance = (color) => {
      const hex = color.replace('#', '');
      const rgb = parseInt(hex, 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    // Comparar contraste entre cores principais
    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue('--bg').trim();
    const text = styles.getPropertyValue('--text').trim();

    const bgLum = getLuminance(bg);
    const textLum = getLuminance(text);

    const contrast = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);

    if (contrast < 4.5) {
      console.warn(
        '⚠️ Contraste baixo detectado. Recomendação WCAG AA: 4.5:1 para texto normal, encontrado:',
        contrast.toFixed(2) + ':1'
      );
    }
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const a11y = new Accessibility();
  a11y.checkContrast();
});
