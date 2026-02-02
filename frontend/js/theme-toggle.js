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
    // Use external monochrome SVG files (path adjusted for pages)
    const base = location.pathname.includes('/pages/') ? '../' : '';
    const img = document.createElement('img');
    img.src = base + (this.theme === 'dark' ? 'img/sun.svg' : 'img/moon.svg');
    img.alt = 'Tema';
    img.width = 20;
    img.height = 20;
    img.style.display = 'block';
    toggleBtn.appendChild(img);
    toggleBtn.addEventListener('click', () => this.toggleTheme());

    // Botão de configurações
    const settingsBtn = document.createElement('button');
    settingsBtn.id = 'settings-btn';
    settingsBtn.className = 'settings-btn';
    settingsBtn.setAttribute('aria-label', 'Abrir configurações');
    const gear = document.createElement('img');
    gear.src = base + 'img/gear.svg';
    gear.alt = 'Configurações';
    gear.width = 20;
    gear.height = 20;
    gear.style.display = 'block';
    settingsBtn.appendChild(gear);
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
      const imgEl = document.querySelector('#theme-toggle img');
      if (imgEl) imgEl.src = (location.pathname.includes('/pages/') ? '../' : '') + (this.theme === 'dark' ? 'img/sun.svg' : 'img/moon.svg');
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
