# Deploy para GitHub

## Próximas Etapas para Entregar no GitHub

### 1️⃣ Criar um repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. **Nome do repositório**: `atv-yur-react` (ou escolha um nome)
4. **Descrição**: "Aplicação de consulta de localidades por DDD com React Native e TypeScript"
5. Defina como **Public** (para avaliação)
6. Clique em "Create repository"

### 2️⃣ Adicionar origem remota (Remote)

Após criar o repositório, copie o URL HTTPS (recomendado) ou SSH e execute:

**Com HTTPS:**

```bash
git remote add origin https://github.com/seu-usuario/atv-yur-react.git
git branch -M main
git push -u origin main
```

**Com SSH:**

```bash
git remote add origin git@github.com:seu-usuario/atv-yur-react.git
git branch -M main
git push -u origin main
```

### 3️⃣ Verificar o Push

Após executar o comando acima, você verá o progresso do upload. Quando concluir:

```bash
git log --oneline
```

Isso mostrará o commit com a data e hora exata. **Essa é a data/hora que será considerada na avaliação.**

## ✅ Checklist de Entrega

- [x] Projeto React Native com TypeScript criado
- [x] Hook customizado `useDDDSearch` implementado
- [x] Interfaces TypeScript para API (`DDDResponse`, `DDDSearchState`)
- [x] Componente principal com useState e useEffect
- [x] Consumo de API Brasil API funcionando
- [x] Tratamento de erros e validação de entrada
- [x] README.md documentado
- [x] Commit realizado na branch `main`
- [ ] Repositório criado no GitHub
- [ ] Remote origin adicionado
- [ ] Push para GitHub realizado

## 📍 Status Atual

✅ **Aplicação está pronta para uso**

- Todos os requisitos foram implementados
- Código compilável e funcional
- Tipagem TypeScript 100% (sem `any`)
- Pronto para fazer push ao GitHub

## 🔗 Importante

- Certifique-se de que o repositório está **público**
- O avaliador acessará a branch **main**
- A hora do **último commit** em main será considerada

## 📞 Suporte

Se encontrar problemas com git ou GitHub:

1. Verifique se tem conta no GitHub
2. Configure SSH ou HTTPS conforme sua preferência
3. Se novo em git, execute: `git config --global user.name "Seu Nome"` e `git config --global user.email "seu@email.com"`
