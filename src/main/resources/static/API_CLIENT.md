# 📡 API Client - On Street Delivery

Documentação completa do cliente de API para integração com backend.

## 🚀 Uso Básico

```javascript
// O cliente já está global: window.api
// Importado automaticamente em todos os arquivos

// Exemplo de uso:
await api.createMotoboy({
  name: 'João Silva',
  taxaFixa: 5.0,
  reaisPorKm: 1.5
});
```

## 📚 Referência da API

### Motoboys

#### POST /api/motoboy - Criar novo motoboy

```javascript
api.createMotoboy({
  name: string,        // Obrigatório
  taxaFixa: number,   // Obrigatório (ex: 5.0)
  reaisPorKm: number  // Obrigatório (ex: 1.5)
})
```

**Exemplo:**
```javascript
const result = await api.createMotoboy({
  name: 'João Silva',
  taxaFixa: 5.0,
  reaisPorKm: 1.5
});
console.log(result); // { id: '123', name: 'João Silva', ... }
```

#### GET /api/motoboy - Listar todos os motoboys

```javascript
api.getMotoboys()
```

**Exemplo:**
```javascript
const motoboys = await api.getMotoboys();
console.log(motoboys); // Array de motoboys
```

#### PUT /api/motoboy/:id - Atualizar motoboy

```javascript
api.updateMotoboy(id, {
  name?: string,
  taxaFixa?: number,
  reaisPorKm?: number
})
```

**Exemplo:**
```javascript
await api.updateMotoboy('123', {
  name: 'João Santos',
  taxaFixa: 6.0
});
```

#### DELETE /api/motoboy/:id - Deletar motoboy

```javascript
api.deleteMotoboy(id)
```

**Exemplo:**
```javascript
await api.deleteMotoboy('123');
```

---

### Entregas

#### POST /api/entrega - Criar nova entrega

```javascript
api.createEntrega({
  motoboy: string,      // Obrigatório
  cliente: string,      // Obrigatório
  endereco: string,     // Obrigatório
  bairro: string,       // Obrigatório
  telefone: string,     // Obrigatório
  km: number            // Obrigatório
})
```

**Exemplo:**
```javascript
const result = await api.createEntrega({
  motoboy: 'João Silva',
  cliente: 'Restaurante do Zé',
  endereco: 'Rua das Flores, 123',
  bairro: 'Centro',
  telefone: '11987654321',
  km: 2.5
});
console.log(result); // { id: '456', motoboy: 'João Silva', ... }
```

#### GET /api/entrega - Listar todas as entregas

```javascript
api.getEntregas()
```

**Exemplo:**
```javascript
const entregas = await api.getEntregas();
console.log(entregas); // Array de entregas
```

#### PUT /api/entrega/:id - Atualizar entrega

```javascript
api.updateEntrega(id, {
  motoboy?: string,
  cliente?: string,
  endereco?: string,
  bairro?: string,
  telefone?: string,
  km?: number,
  status?: string
})
```

**Exemplo:**
```javascript
await api.updateEntrega('456', {
  status: 'concluída',
  km: 3.2
});
```

#### DELETE /api/entrega/:id - Deletar entrega

```javascript
api.deleteEntrega(id)
```

**Exemplo:**
```javascript
await api.deleteEntrega('456');
```

---

## 🔧 Integração com Formulários

A classe `FormAPI` automaticamente conecta formulários às chamadas de API.

### Formulário de Motoboy

```html
<form id="motoboyForm">
  <input type="text" id="name" required>
  <input type="number" id="taxaFixa" required>
  <input type="number" id="reaisPorKm" required>
  <button type="submit">Enviar</button>
</form>
```

Ao enviar, automaticamente faz POST em `/api/motoboy`.

### Formulário de Entrega

```html
<form class="entrega-form">
  <select name="motoboy" required></select>
  <input type="text" name="cliente" required>
  <input type="text" name="telefone" required>
  <input type="text" name="endereco" required>
  <input type="text" name="bairro" required>
  <input type="number" name="numero" required>
  <input type="number" name="km" required>
  <button type="submit">Enviar</button>
</form>
```

Ao enviar, automaticamente faz POST em `/api/entrega`.

---

## ⚙️ Configuração

### Alterar URL base

```javascript
// Por padrão usa localhost:3000
window.api = new APIClient('http://seu-backend.com');
```

---

## 🔄 Tratamento de Erros

```javascript
try {
  const result = await api.createMotoboy({
    name: 'João Silva',
    taxaFixa: 5.0,
    reaisPorKm: 1.5
  });
  console.log('✅ Sucesso:', result);
} catch (error) {
  console.error('❌ Erro:', error);
  // Mostrar mensagem ao usuário
}
```

Erros são automaticamente logados no console com emoji indicador.

---

## 📊 Exemplo Completo

```javascript
// Criar motoboy
const newMotoboy = await api.createMotoboy({
  name: 'Maria Silva',
  taxaFixa: 5.5,
  reaisPorKm: 1.8
});
console.log('Novo motoboy ID:', newMotoboy.id);

// Criar entrega
const newEntrega = await api.createEntrega({
  motoboy: newMotoboy.id,
  cliente: 'Pizzaria Italia',
  endereco: 'Av. Paulista, 456',
  bairro: 'Bela Vista',
  telefone: '11987654322',
  km: 3.2
});
console.log('Nova entrega ID:', newEntrega.id);

// Listar todos
const motoboys = await api.getMotoboys();
const entregas = await api.getEntregas();
console.log(`${motoboys.length} motoboys e ${entregas.length} entregas`);

// Atualizar
await api.updateEntrega(newEntrega.id, { status: 'concluída' });

// Deletar
await api.deleteMotoboy(newMotoboy.id);
```

---

## 🛠️ Headers Utilizados

Todas as requisições incluem:

```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

Para adicionar autenticação, modifique `api-client.js`:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

---

## 📝 Status de Resposta

- **200** - Sucesso
- **201** - Criado
- **400** - Requisição inválida
- **401** - Não autorizado
- **404** - Não encontrado
- **500** - Erro do servidor

---

## 💾 Próximos Passos

Para usar com backend real:

1. **Instale o backend**
   ```bash
   # Veja a documentação do backend
   cd backend
   npm install
   npm start
   ```

2. **Altere a URL da API**
   ```javascript
   window.api = new APIClient('http://localhost:3000');
   ```

3. **Teste os endpoints**
   ```javascript
   // Abra DevTools (F12) e execute:
   await api.getMotoboys();
   ```

---

**Versão:** 1.0  
**Atualizado:** Fevereiro 2026
