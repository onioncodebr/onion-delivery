/**
 * Sistema de Validação de Formulários
 * Validação em cliente com feedback visual
 */

class FormValidator {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.validateForm(e, form));
      form.addEventListener('input', (e) => this.validateField(e.target));
    });
  }

  /**
   * Validar campo individual
   */
  validateField(field) {
    const error = document.querySelector(`[data-error="${field.name}"]`);
    let isValid = true;
    let message = '';

    // Validações gerais
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      message = 'Este campo é obrigatório';
    } else if (field.type === 'email' && field.value) {
      isValid = this.validateEmail(field.value);
      message = !isValid ? 'Email inválido' : '';
    } else if (field.type === 'number' && field.value) {
      isValid = !isNaN(field.value) && field.value > 0;
      message = !isValid ? 'Deve ser um número válido' : '';
    } else if (field.type === 'tel' && field.value) {
      isValid = field.value.replace(/\D/g, '').length >= 10;
      message = !isValid ? 'Telefone inválido' : '';
    }

    // Atualizar UI
    if (isValid && field.value) {
      field.classList.remove('error');
      field.classList.add('success');
      if (error) error.textContent = '';
    } else if (!isValid && field.value) {
      field.classList.remove('success');
      field.classList.add('error');
      if (error) {
        error.textContent = message;
        error.style.display = 'block';
      }
    } else {
      field.classList.remove('error', 'success');
      if (error) error.textContent = '';
    }

    return isValid || !field.value;
  }

  /**
   * Validar email
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validar formulário completo
   */
  validateForm(e, form) {
    const fields = form.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      e.preventDefault();
      this.showNotification('Preencha todos os campos corretamente', 'error');
      return false;
    }

    // Sucesso
    this.showNotification('Formulário enviado com sucesso!', 'success');
    e.preventDefault(); // Remover em produção para enviar ao servidor
  }

  /**
   * Mostrar notificação
   */
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? 'var(--accent)' : '#ef4444'};
      color: var(--bg);
      border-radius: 8px;
      font-weight: 600;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
}

// Iniciar validação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator();
});

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
  input.error,
  select.error {
    border-color: #ef4444 !important;
    background-color: rgba(239, 68, 68, 0.1) !important;
  }

  input.success,
  select.success {
    border-color: var(--accent) !important;
  }

  [data-error] {
    color: #ef4444;
    font-size: 12px;
    margin-top: 4px;
    display: none;
  }

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
