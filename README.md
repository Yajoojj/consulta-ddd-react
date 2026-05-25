# Consulta de DDD Brasil

Aplicativo mobile e web para consultar informações de DDD (Discagem Direta à Distância) do Brasil.

## Descrição

O aplicativo permite buscar um código de DDD e obter informações sobre:

- Estado (UF) correspondente
- Código DDD
- Lista de cidades que utilizam aquele DDD

Os dados são obtidos através da [Brasil API](https://brasilapi.com.br/).

## Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento com React Native
- **TypeScript** - Linguagem tipada para JavaScript
- **Expo Router** - Roteamento baseado em arquivos
- **React Native Web** - Suporte a web

## Como executar

### Pré-requisitos

```bash
node --version  # v18+
npm --version   # v9+
```

### Instalação

```bash
npm install
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

Use as seguintes teclas para abrir em diferentes plataformas:

- **w** - Web
- **a** - Android (requer emulador)
- **i** - iOS (requer Xcode no macOS)

### Compilação

```bash
# Para web
npm run web

# Para Android
npm run android

# Para iOS
npm run ios
```

## Estrutura do Projeto

```
src/
├── app/              # Telas e roteamento
├── components/       # Componentes reutilizáveis
├── constants/        # Constantes e temas
├── hooks/            # Custom hooks
└── types/            # Tipos TypeScript
```

## Recursos

- Validação de entrada (apenas números)
- Tratamento de erros com mensagens claras
- Suporte a tema claro e escuro
- Interface responsiva
- Sem dependências externas desnecessárias

## Notas

- O aplicativo valida DDDs com exatamente 2 dígitos
- Há um delay de 350ms na requisição para melhor UX
- Os dados são buscados em tempo real da Brasil API

## API usada

- endpoint: `GET https://brasilapi.com.br/api/ddd/v1/{ddd}`
- retorno esperado: estado, código DDD e cidades

## Observação

O projeto foi organizado para manter a navegação simples e a interface direta, sem depender de bibliotecas extras além do que o Expo já fornece.
