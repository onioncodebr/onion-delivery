/**
 * API Client - Motoboy e Entrega
 * Métodos POST para /api/motoboy e /api/entrega
 */

class APIClient {
  constructor(baseURL = 'http://localhost:8080') {
    this.baseURL = baseURL;
  }

  /**
   * Criar novo motoboy
   * POST /api/motoboy
   */
  async createMotoboy(data) {
    try {
      const response = await fetch(`${this.baseURL}/api/motoboy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Motoboy criado:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao criar motoboy:', error);
      throw error;
    }
  }

  /**
   * Listar motoboys
   * GET /api/motoboy
   */
  async getMotoboys() {
    try {
      const response = await fetch(`${this.baseURL}/api/motoboy`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Motoboys listados:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao listar motoboys:', error);
      throw error;
    }
  }

  /**
   * Atualizar motoboy
   * PUT /api/motoboy/:id
   */
  async updateMotoboy(id, data) {
    try {
      const response = await fetch(`${this.baseURL}/api/motoboy/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Motoboy atualizado:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao atualizar motoboy:', error);
      throw error;
    }
  }

  /**
   * Deletar motoboy
   * DELETE /api/motoboy/:id
   */
  async deleteMotoboy(id) {
    try {
      const response = await fetch(`${this.baseURL}/api/motoboy/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Motoboy deletado:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao deletar motoboy:', error);
      throw error;
    }
  }

  /**
   * Criar nova entrega
   * POST /api/entrega
   */
  async createEntrega(data) {
    try {
      const response = await fetch(`${this.baseURL}/api/entrega`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Entrega criada:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao criar entrega:', error);
      throw error;
    }
  }

  /**
   * Listar entregas
   * GET /api/entrega
   */
  async getEntregas() {
    try {
      const response = await fetch(`${this.baseURL}/api/entrega`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Entregas listadas:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao listar entregas:', error);
      throw error;
    }
  }

  /**
   * Atualizar entrega
   * PUT /api/entrega/:id
   */
  async updateEntrega(id, data) {
    try {
      const response = await fetch(`${this.baseURL}/api/entrega/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Entrega atualizada:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao atualizar entrega:', error);
      throw error;
    }
  }

  /**
   * Deletar entrega
   * DELETE /api/entrega/:id
   */
  async deleteEntrega(id) {
    try {
      const response = await fetch(`${this.baseURL}/api/entrega/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Entrega deletada:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao deletar entrega:', error);
      throw error;
    }
  }
}

// Exportar para uso global
window.api = new APIClient();

// Exemplos de uso:
/*
// Criar motoboy
api.createMotoboy({
  name: 'João Silva',
  taxaFixa: 5.0,
  reaisPorKm: 1.5
});

// Criar entrega
api.createEntrega({
  motoboy: 'João Silva',
  cliente: 'Restaurante do Zé',
  endereco: 'Rua das Flores, 123',
  bairro: 'Centro',
  telefone: '11987654321',
  km: 2.5
});

// Listar
api.getMotoboys();
api.getEntregas();

// Atualizar
api.updateMotoboy('123', { name: 'João Santos' });
api.updateEntrega('456', { status: 'concluída' });

// Deletar
api.deleteMotoboy('123');
api.deleteEntrega('456');
*/
