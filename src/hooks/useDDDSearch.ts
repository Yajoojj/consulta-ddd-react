import { useEffect, useState } from 'react';
import { DDDResponse, DDDSearchState } from '@/types/api';

/**
 * Hook customizado para buscar informações de DDD na API Brasil API
 * @param dddCode - Código DDD a ser buscado
 * @returns Estado da busca (loading, data, error)
 */
export function useDDDSearch(dddCode: string) {
  const [state, setState] = useState<Omit<DDDSearchState, 'dddCode'>>({
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    // Se o código estiver vazio, limpa o estado
    if (!dddCode || dddCode.trim() === '') {
      setState({
        loading: false,
        data: null,
        error: null,
      });
      return;
    }

    // Valida se é um código DDD válido (2 dígitos numéricos)
    if (!/^\d{2}$/.test(dddCode)) {
      setState({
        loading: false,
        data: null,
        error: 'DDD deve conter exatamente 2 dígitos numéricos',
      });
      return;
    }

    const fetchDDDData = async () => {
      setState({
        loading: true,
        data: null,
        error: null,
      });

      try {
        const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddCode}`);

        if (!response.ok) {
          throw new Error(`Erro ao buscar DDD: ${response.status}`);
        }

        const data: DDDResponse = await response.json();
        setState({
          loading: false,
          data,
          error: null,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setState({
          loading: false,
          data: null,
          error: `Não foi possível encontrar dados para o DDD ${dddCode}. ${errorMessage}`,
        });
      }
    };

    // Debounce de 500ms para evitar muitas requisições
    const timeoutId = setTimeout(fetchDDDData, 500);

    return () => clearTimeout(timeoutId);
  }, [dddCode]);

  return state;
}
