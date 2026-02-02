/**
 * Sistema de navegação SPA (Single Page Application)
 * Carrega páginas sem recarregar
 */

class Navigation {
  constructor() {
    this.currentPage = 'dashboard';
    this.mainElement = document.querySelector('main');
    this.navLinks = document.querySelectorAll('nav a');
    this.init();
  }

  init() {
    // Interceptar cliques dos links de navegação
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = link.getAttribute('href');
        const page = this.getPageFromHref(href);
        
        // Atualizar link ativo
        this.setActiveLink(link);
        
        // Carregar página
        this.loadPage(page);
      });
    });
  }

  /**
   * Extrai o nome da página do href
   */
  getPageFromHref(href) {
    if (href.includes('index.html') || href === '../index.html' || href === './') {
      return 'dashboard';
    } else if (href.includes('entrega')) {
      return 'entrega';
    } else if (href.includes('motoboy')) {
      return 'motoboy';
    } else if (href.includes('relatorios')) {
      return 'relatorios';
    }
    return 'dashboard';
  }

  /**
   * Marca o link como ativo
   */
  setActiveLink(activeLink) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  /**
   * Carrega a página dinamicamente
   */
  async loadPage(page) {
    try {
      if (page === this.currentPage) return;

      this.currentPage = page;

      // Mostrar loading
      this.mainElement.innerHTML = '<p style="text-align: center; padding: 40px;">Carregando...</p>';

      // Determinar URL da página
      let url;
      const isOnRoot = document.location.pathname.includes('index.html') || 
                       document.location.pathname.endsWith('/');

      if (isOnRoot) {
        // Estamos na raiz (index.html)
        url = page === 'dashboard' ? 'index.html' : `pages/${page}.html`;
      } else {
        // Estamos em uma página (pages/)
        url = page === 'dashboard' ? '../index.html' : `${page}.html`;
      }

      // Fetch da página
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ao carregar ${url}`);
      }

      const html = await response.text();

      // Extrair apenas o conteúdo do <main>
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newMainContent = doc.querySelector('main');

      if (newMainContent) {
        // Atualizar o conteúdo
        this.mainElement.innerHTML = newMainContent.innerHTML;

        // Scroll para o topo
        window.scrollTo(0, 0);

        // Reinicar animações/scripts se necessário
        this.onPageLoaded(page);
      } else {
        throw new Error('Conteúdo main não encontrado');
      }
    } catch (error) {
      console.error('Erro na navegação:', error);
      this.mainElement.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Erro ao carregar página: ${error.message}</p>`;
    }
  }

  /**
   * Callback executado após página carregada
   */
  onPageLoaded(page) {
    console.log(`Página carregada: ${page}`);
    
    // Aqui você pode reinicializar scripts, gráficos, etc.
    // Exemplo: reiniciar event listeners de formulários
    this.initPageScripts();
  }

  /**
   * Inicializar scripts específicos da página
   */
  initPageScripts() {
    // Inicializar event listeners de botões, formulários, etc.
    const buttons = document.querySelectorAll('button');
    const forms = document.querySelectorAll('form');

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        console.log('Botão clicado:', btn.textContent);
      });
    });

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Formulário submetido');
      });
    });
  }
}

// Iniciar navegação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
