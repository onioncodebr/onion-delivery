/**
 * Integração de Formulários com API
 * Conectar formulários aos métodos POST da API
 */

class FormAPI {
  constructor() {
    this.api = window.api;
    this.setupForms();
  }

  /**
   * Configurar formulários para enviar via API
   */
  setupForms() {
    document.addEventListener('submit', (e) => {
      const form = e.target;

      if (form.id === 'motoboyForm') {
        e.preventDefault();
        this.handleMotoboySubmit(form);
      }

      if (form.classList.contains('entrega-form')) {
        e.preventDefault();
        this.handleEntregaSubmit(form);
      }
    });
  }

  /**
   * Enviar dados de motoboy
   */
  async handleMotoboySubmit(form) {
    try {
      const data = {
        name: form.querySelector('#name')?.value,
        minTaxa: parseFloat(form.querySelector('#taxaFixa')?.value),
        priceKM: parseFloat(form.querySelector('#reaisPorKm')?.value),
      };

      console.log('📤 Enviando motoboy:', data);
      const result = await this.api.createMotoboy(data);

      this.showSuccessMessage('Motoboy cadastrado com sucesso! ✅', form);
      form.reset();

      // Atualizar tabela se existir
      await this.loadMotoboysList();
    } catch (error) {
      this.showErrorMessage(error.message, form);
    }
  }

  /**
   * Enviar dados de entrega
   */
  async handleEntregaSubmit(form) {
    try {
      const data = {
        motoboy: form.querySelector('select[name="motoboy"]')?.value,
        cliente: form.querySelector('input[name="cliente"]')?.value,
        telefone: form.querySelector('input[name="telefone"]')?.value,
        endereco: form.querySelector('input[name="endereco"]')?.value,
        bairro: form.querySelector('input[name="bairro"]')?.value,
        numero: form.querySelector('input[name="numero"]')?.value,
        km: parseFloat(form.querySelector('input[name="km"]')?.value),
      };

      console.log('📤 Enviando entrega:', data);
      const result = await this.api.createEntrega(data);

      this.showSuccessMessage('Entrega cadastrada com sucesso! ✅', form);
      form.reset();

      // Atualizar tabela se existir
      await this.loadEntregasList();
    } catch (error) {
      this.showErrorMessage(error.message, form);
    }
  }

  /**
   * Carregar lista de motoboys
   */
  async loadMotoboysList() {
    try {
      const motoboys = await this.api.getMotoboys();
      this.populateMotoboyTable(motoboys);
      this.populateMotoboySelect(motoboys);
    } catch (error) {
      console.error('Erro ao carregar motoboys:', error);
    }
  }

  /**
   * Carregar lista de entregas
   */
  async loadEntregasList() {
    try {
      const entregas = await this.api.getEntregas();
      this.populateEntregasTable(entregas);
    } catch (error) {
      console.error('Erro ao carregar entregas:', error);
    }
  }

  /**
   * Popular tabela de motoboys
   */
  populateMotoboyTable(motoboys) {
    const tbody = document.querySelector('table tbody');
    if (!tbody) return;

    tbody.innerHTML = motoboys
      .map(
        (m) => `
      <tr>
        <td>${m.name}</td>
        <td>R$ ${m.taxaFixa.toFixed(2)}</td>
        <td>R$ ${m.reaisPorKm.toFixed(2)}</td>
      </tr>
    `
      )
      .join('');
  }

  /**
   * Popular select de motoboys
   */
  populateMotoboySelect(motoboys) {
    const select = document.querySelector('select[name="motoboy"]');
    if (!select) return;

    select.innerHTML = '<option value="">Selecione</option>' + motoboys.map((m) => `<option value="${m.id}">${m.name}</option>`).join('');
  }

  /**
   * Popular tabela de entregas
   */
  populateEntregasTable(entregas) {
    const tbody = document.querySelector('table tbody');
    if (!tbody) return;

    tbody.innerHTML = entregas
      .map(
        (e) => `
      <tr>
        <td>${e.data || new Date().toLocaleDateString()}</td>
        <td>${e.motoboy}</td>
        <td>${e.cliente}</td>
        <td>${e.endereco}</td>
        <td>${e.telefone}</td>
        <td>${e.km.toFixed(2)} km</td>
      </tr>
    `
      )
      .join('');
  }

  /**
   * Mostrar mensagem de sucesso
   */
  showSuccessMessage(message, form) {
    const alert = document.createElement('div');
    alert.style.cssText = `
      background: var(--accent);
      color: var(--bg);
      padding: 12px 16px;
      border-radius: 8px;
      margin: 12px 0;
      animation: slideUp 0.3s ease;
    `;
    alert.textContent = message;
    form.parentNode.insertBefore(alert, form);

    setTimeout(() => alert.remove(), 4000);
  }

  /**
   * Mostrar mensagem de erro
   */
  showErrorMessage(message, form) {
    const alert = document.createElement('div');
    alert.style.cssText = `
      background: #ef4444;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      margin: 12px 0;
      animation: slideUp 0.3s ease;
    `;
    alert.textContent = '❌ Erro: ' + message;
    form.parentNode.insertBefore(alert, form);

    setTimeout(() => alert.remove(), 4000);
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new FormAPI();
});
