/**
 * Dark Mode Toggle - Minimalista
 * Alternar entre modo claro/escuro com persistência
 */

class ThemeToggle {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.createToggleButton();
  }

  /**
   * Criar botão de toggle minimalista
   */
  createToggleButton() {
    const header = document.querySelector('header');
    if (!header) return;

    const rightSlot = header.querySelector('div:last-child');
    if (!rightSlot) return;

    // Container para os botões
    const controls = document.createElement('div');
    controls.className = 'theme-controls';

    // Botão de tema
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.className = 'theme-btn';
    toggleBtn.setAttribute('aria-label', 'Alternar tema claro/escuro');
    // Inline monochrome SVGs inherit color via currentColor
    const sunSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><circle cx="12" cy="12" r="4"/></svg>';
    const moonSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    toggleBtn.innerHTML = this.theme === 'dark' ? sunSvg : moonSvg;
    toggleBtn.addEventListener('click', () => this.toggleTheme());

    // Botão de configurações
    const settingsBtn = document.createElement('button');
    settingsBtn.id = 'settings-btn';
    settingsBtn.className = 'settings-btn';
    settingsBtn.setAttribute('aria-label', 'Abrir configurações');
    // Inline gear SVG (monochrome)
    const gearSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><circle cx="12" cy="12" r="3"/></svg>';
    settingsBtn.innerHTML = gearSvg;
    settingsBtn.addEventListener('click', () => this.openSettings());

    // Adicionar botões ao container
    controls.appendChild(toggleBtn);
    controls.appendChild(settingsBtn);

    // Adicionar container ao header
    rightSlot.appendChild(controls);
  }

  /**
   * Alternar tema
   */
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const toggleBtnEl = document.getElementById('theme-toggle');
      if (toggleBtnEl) {
        toggleBtnEl.innerHTML = this.theme === 'dark' ? sunSvg : moonSvg;
      }
    }
  }

  /**
   * Abrir modal de configurações (futuro)
   */
  openSettings() {
    // Placeholder para futuro desenvolvimento
    alert('⚙️ Configurações em desenvolvimento...\n\nFuncionalidades planejadas:\n- Preferências de notificação\n- Idioma\n- Dados e hora\n- Permissões');
  }

  /**
   * Aplicar tema
   */
  applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'light') {
      root.style.setProperty('--bg', '#ffffff');
      root.style.setProperty('--bg-soft', '#f5f5f5');
      root.style.setProperty('--text', '#1a1a1a');
      root.style.setProperty('--text-soft', '#555555');
      root.style.setProperty('--border', '#e0e0e0');
      root.style.setProperty('--border-soft', '#d0d0d0');
    } else {
      root.style.setProperty('--bg', '#1d2021');
      root.style.setProperty('--bg-soft', '#282828');
      root.style.setProperty('--text', '#ebdbb2');
      root.style.setProperty('--text-soft', '#d5c4a1');
      root.style.setProperty('--border', '#3c3836');
      root.style.setProperty('--border-soft', '#504945');
    }

    document.body.setAttribute('data-theme', theme);
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});
