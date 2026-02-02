# Sistema de Navegação SPA

## 📱 Como Funciona

O arquivo `js/navigation.js` implementa um sistema de **Single Page Application (SPA)** que permite navegar entre páginas **sem recarregar a página**.

### Exemplo de uso:

Ao clicar de "Motoboys" para "Entregas", o conteúdo é carregado dinamicamente:

1. ❌ Sem recarregar - O header, navegação e footer permanecem
2. ✅ Apenas o `<main>` é atualizado com novo conteúdo
3. 🎯 Scroll automático para o topo
4. 🔗 URL do navegador é atualizada automaticamente

## 🔧 Como Funciona Internamente

```javascript
// 1. Intercepta cliques nos links
nav a → addEventListener('click')

// 2. Extrai o nome da página
href="pages/motoboy.html" → page = 'motoboy'

// 3. Faz fetch do conteúdo
fetch('pages/motoboy.html')

// 4. Extrai apenas o <main>
parser.parseFromString(html) → querySelector('main')

// 5. Atualiza o DOM
mainElement.innerHTML = newMainContent.innerHTML
```

## 📝 Modificações Necessárias

Todos os arquivos HTML já foram atualizados com:

```html
<script src="js/navigation.js"></script>
<!-- Antes de </body> -->
```

## 🚀 Bônus - Para Adicionar Mais Funcionalidades

No método `onPageLoaded(page)`, você pode:

```javascript
onPageLoaded(page) {
  // Reinicializar gráficos (se usar Chart.js)
  if (page === 'dashboard') {
    initCharts();
  }
  
  // Reinicializar máscaras de input
  if (page === 'entrega') {
    initInputMasks();
  }
  
  // Carregar dados específicos da página
  this.loadPageData(page);
}
```

## ⚠️ Limitações

- Funciona com conteúdo estático (HTML)
- Para aplicações mais complexas, considere usar React/Vue.js
- Sem histórico de navegação automático (pode ser adicionado com History API)

## 🔄 Adicionar Histórico (Voltar/Avançar)

Se quiser melhorar ainda mais, adicione suporte ao botão voltar:

```javascript
// No init():
window.addEventListener('popstate', (e) => {
  if (e.state?.page) {
    this.currentPage = '';
    this.loadPage(e.state.page);
  }
});

// Após loadPage():
history.pushState({ page }, '', `?page=${page}`);
```

---

**Status:** ✅ Sistema de navegação SPA ativo em todas as páginas
