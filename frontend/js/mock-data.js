/**
 * Mock Data - Dados simulados para desenvolvimento
 */

export const mockData = {
  motoboys: [
    { id: 1, name: 'João Silva', taxaFixa: 5.0, reaisPorKm: 1.5, entregas: 45, kmTotal: 120 },
    { id: 2, name: 'Maria Oliveira', taxaFixa: 5.0, reaisPorKm: 1.5, entregas: 38, kmTotal: 95 },
    { id: 3, name: 'Pedro Santos', taxaFixa: 5.0, reaisPorKm: 1.5, entregas: 32, kmTotal: 85 },
    { id: 4, name: 'Ana Costa', taxaFixa: 5.0, reaisPorKm: 1.5, entregas: 28, kmTotal: 72 },
  ],

  entregas: [
    {
      id: 1,
      data: '2026-02-01',
      motoboy: 'João Silva',
      cliente: 'Restaurante do Zé',
      endereco: 'Rua das Flores, 123',
      bairro: 'Centro',
      telefone: '11987654321',
      km: 2.5,
    },
    {
      id: 2,
      data: '2026-02-01',
      motoboy: 'Maria Oliveira',
      cliente: 'Pizzaria Italia',
      endereco: 'Av. Paulista, 456',
      bairro: 'Bela Vista',
      telefone: '11987654322',
      km: 3.2,
    },
    {
      id: 3,
      data: '2026-02-02',
      motoboy: 'Pedro Santos',
      cliente: 'Padaria Francês',
      endereco: 'Rua Augusta, 789',
      bairro: 'Vila Mariana',
      telefone: '11987654323',
      km: 1.8,
    },
    {
      id: 4,
      data: '2026-02-02',
      motoboy: 'Ana Costa',
      cliente: 'Açaí da Praia',
      endereco: 'Rua da Praia, 321',
      bairro: 'Brooklin',
      telefone: '11987654324',
      km: 4.1,
    },
  ],

  dashboard: {
    totalEntregas: 142,
    motoboyDestaque: 'João Silva',
    kmRodados: 856,
    valorTotal: 4260.00,
    entregas: [
      { label: 'Total de Entregas', value: '142', subtitle: 'no mês' },
      { label: 'Motoboy Destaque', value: 'João Silva', subtitle: '32 entregas' },
      { label: 'KMs Rodados', value: '856 km', subtitle: 'todos os motoboys' },
      { label: 'Valor Total', value: 'R$ 4.260', subtitle: 'entregas do mês' },
    ],
  },

  relatorios: {
    totalEntregas: 142,
    kmTotal: 856,
    totalTaxas: 1240.00,
    mediaEntrega: 8.73,
    motoboys: [
      {
        nome: 'João Silva',
        entregas: 45,
        kmTotal: 120,
        taxasFixas: 225.00,
        totalKm: 180.00,
        totalPagar: 405.00,
      },
      {
        nome: 'Maria Oliveira',
        entregas: 38,
        kmTotal: 95,
        taxasFixas: 190.00,
        totalKm: 142.50,
        totalPagar: 332.50,
      },
      {
        nome: 'Pedro Santos',
        entregas: 32,
        kmTotal: 85,
        taxasFixas: 160.00,
        totalKm: 127.50,
        totalPagar: 287.50,
      },
      {
        nome: 'Ana Costa',
        entregas: 28,
        kmTotal: 72,
        taxasFixas: 140.00,
        totalKm: 108.00,
        totalPagar: 248.00,
      },
    ],
  },
};

/**
 * Função helper para popular tabelas dinamicamente
 */
export function populateTable(tableSelector, data, columns) {
  const table = document.querySelector(tableSelector);
  if (!table) return;

  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(col => {
      const td = document.createElement('td');
      td.textContent = row[col] || '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

/**
 * Função helper para popular cards
 */
export function populateDashboard(dashboardSelector, data) {
  const container = document.querySelector(dashboardSelector);
  if (!container) return;

  container.innerHTML = data
    .map(
      (item) => `
    <div class="card">
      <h3>${item.label}</h3>
      <span class="big">${item.value}</span>
      <small>${item.subtitle}</small>
    </div>
  `
    )
    .join('');
}
