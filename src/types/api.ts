/**
 * Interface que mapeia a resposta da API Brasil API para busca de DDD
 * https://brasilapi.com.br/docs#tag/DDD
 */
export interface DDDResponse {
  state: string; // UF - Estado (ex: SP, RJ, MG)
  area_code: string; // Código de área (DDD) - ex: "11"
  cities: string[]; // Lista de cidades associadas ao DDD
}

/**
 * Interface para controlar o estado de carregamento e dados da aplicação
 */
export interface DDDSearchState {
  dddCode: string; // Código DDD digitado pelo usuário
  loading: boolean; // Status de carregamento della requisição
  data: DDDResponse | null; // Dados retornados pela API
  error: string | null; // Mensagem de erro, se houver
}
