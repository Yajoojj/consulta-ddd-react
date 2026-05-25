#!/bin/bash
# Script para fazer upload do projeto para GitHub

# INSTRUÇÕES:
# 1. Crie um repositório no GitHub (será chamado de "atv-yur-react")
# 2. Copie a URL do repositório (usar HTTPS ou SSH)
# 3. Execute as linhas abaixo no terminal

# ============================================
# OPÇÃO 1: Usando HTTPS (Recomendado para iniciantes)
# ============================================

git remote add origin https://github.com/SEU_USUARIO/atv-yur-react.git
git branch -M main
git push -u origin main

# ============================================
# OPÇÃO 2: Usando SSH (Se tiver chave SSH configurada)
# ============================================

# git remote add origin git@github.com:SEU_USUARIO/atv-yur-react.git
# git branch -M main
# git push -u origin main

# ============================================
# APÓS O PUSH
# ============================================
# Verifique se o push foi bem-sucedido:
# git log --oneline

# Acesse: https://github.com/SEU_USUARIO/atv-yur-react
# Verifique se os commits aparecem na branch "main"

# ============================================
# OBSERVAÇÕES IMPORTANTES
# ============================================
# - Substitua SEU_USUARIO pelo seu username do GitHub
# - Certifique-se de que o repositório está PÚBLICO
# - O avaliador acessará a branch "main"
# - A hora do último commit será considerada
