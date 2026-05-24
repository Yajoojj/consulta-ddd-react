# Consulta de Localidades por DDD 📍

Aplicação mobile desenvolvida em **React Native** com **TypeScript** que permite consultar cidades por código de área (DDD) utilizando a [API Brasil API](https://brasilapi.com.br/docs#tag/DDD).

## 🎯 Funcionalidades

- ✅ **Busca por DDD**: Digite um código de área (2 dígitos) para consultar as cidades
- ✅ **Validação de entrada**: Aceita apenas 2 dígitos numéricos
- ✅ **Gerenciamento de estado**: Utilizando `useState` para controlar dados e `useEffect` para requisições
- ✅ **Tipagem TypeScript**: 100% tipado sem uso de `any`
- ✅ **Tratamento de erros**: Mensagens claras em caso de falha
- ✅ **Interface responsiva**: Exibe estado (UF) e lista de cidades de forma clara
- ✅ **Debounce**: Evita requisições excessivas durante digitação

## 📋 Requisitos Implementados

### 1. Interface
- Campo de entrada para código DDD (exclusivamente 2 dígitos numéricos)
- Botão para acionar a busca
- Renderização clara do Estado (UF)
- Lista completa de cidades associadas ao DDD

### 2. Gerenciamento de Estado
- `useState` para controlar: input, payload da API e status de carregamento
- `useEffect` para lidar com chamadas assíncronas e gatilhos de requisição
- Hook customizado `useDDDSearch` encapsulando toda lógica

### 3. Consumo de API
- Requisição HTTP para: `https://brasilapi.com.br/api/ddd/v1/{ddd}`
- Parâmetro de rota dinâmico baseado na entrada do usuário
- Tratamento de erros e estados de carregamento

### 4. Tipagem TypeScript
- Interfaces `DDDResponse` e `DDDSearchState`
- Zero uso de tipagem genérica (`any`)
- Tipagem completa de hooks e componentes

## 🚀 Como Executar

### Instalação

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd atv-yur-react

# Instalar dependências
npm install
```

### Executar a aplicação

**No navegador (Web):**
```bash
npm run web
```

**Android:**
```bash
npx expo run:android
```

**iOS:**
```bash
npx expo run:ios
```

**Expo Go (rápido):**
```bash
npx expo start
# Escanear QR code com Expo Go
```

## 📐 Estrutura do Projeto

```
src/
├── app/
│   ├── _layout.tsx              # Configuração de rotas
│   ├── index.tsx                # Tela principal (Aplicação)
│   └── explore.tsx              # Tela de exploração
├── components/                  # Componentes reutilizáveis
├── constants/
│   └── theme.ts                 # Constantes de tema e espaçamento
├── hooks/
│   └── useDDDSearch.ts          # Hook customizado para busca de DDD
├── types/
│   └── api.ts                   # Interfaces TypeScript para a API
└── globals.css                  # Estilos globais
```

## 🔍 Detalhes Técnicos

### Hook Customizado: `useDDDSearch`

Localização: [src/hooks/useDDDSearch.ts](src/hooks/useDDDSearch.ts)

```typescript
const { loading, data, error } = useDDDSearch(dddCode);
```

**Funcionalidades:**
- ✅ Validação de formato (exatamente 2 dígitos)
- ✅ Requisição automática com debounce de 500ms
- ✅ Tratamento de erros com mensagens descritivas
- ✅ Estados: `loading`, `data` e `error`

### Interfaces TypeScript

Localização: [src/types/api.ts](src/types/api.ts)

```typescript
// Resposta da API
export interface DDDResponse {
  state: string;        // UF (ex: SP, RJ, MG)
  area_code: string;    // Código DDD (ex: 11)
  cities: string[];     // Lista de cidades
}

// Estado da aplicação
export interface DDDSearchState {
  dddCode: string;
  loading: boolean;
  data: DDDResponse | null;
  error: string | null;
}
```

### Componente Principal

Localização: [src/app/index.tsx](src/app/index.tsx)

**Fluxo:**
1. Input captura digitação do usuário (validado para números)
2. `useDDDSearch` é chamado com o código
3. Hook faz debounce e requisição automática
4. Resultados são renderizados em tempo real
5. Tratamento de erros e estados de carregamento

## 📱 Exemplo de Uso

1. **Abra a aplicação**
2. **Digite um DDD** (ex: "11" para São Paulo)
3. **Aguarde ou clique em "Buscar"**
4. **Veja os resultados:**
   - Estado: SP
   - Código DDD: 11
   - Cidades: São Paulo, Guarulhos, Osasco, etc...

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React Native | Latest | Framework mobile |
| Expo | Latest | Plataforma de desenvolvimento |
| TypeScript | Latest | Tipagem estática |
| React | Latest | Biblioteca UI |

## 🔗 API Utilizada

**Brasil API - DDD**
- Documentação: https://brasilapi.com.br/docs#tag/DDD
- Endpoint: `GET /api/ddd/v1/{ddd}`
- Resposta: `{ state, area_code, cities }`

## 📝 Observações Importantes

- ✅ Validação rigorosa de entrada (apenas 2 dígitos)
- ✅ Debounce automático evita múltiplas requisições
- ✅ Mensagens de erro descritivas
- ✅ Estados de carregamento com spinner
- ✅ Sem uso de tipagem genérica (`any`)

## 📄 Licença

MIT
