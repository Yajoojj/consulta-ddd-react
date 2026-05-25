import { useEffect, useState } from "react";

import { DDDResponse, DDDSearchState } from "@/types/api";

export function useDDDSearch(dddCode: string) {
  const [state, setState] = useState<Omit<DDDSearchState, "dddCode">>({
    loading: false,
    data: null,
    error: null,
  });

  const normalizedCode = dddCode.trim();
  const isEmpty = normalizedCode === "";
  const isValidCode = /^\d{2}$/.test(normalizedCode);

  useEffect(() => {
    if (isEmpty || !isValidCode) {
      return;
    }

    let isActive = true;

    const fetchDDDData = async () => {
      setState({
        loading: true,
        data: null,
        error: null,
      });

      try {
        const response = await fetch(
          `https://brasilapi.com.br/api/ddd/v1/${normalizedCode}`,
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar DDD: ${response.status}`);
        }

        const data: DDDResponse = await response.json();

        if (!isActive) {
          return;
        }

        setState({
          loading: false,
          data,
          error: null,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";

        if (!isActive) {
          return;
        }

        setState({
          loading: false,
          data: null,
          error: `Não foi possível encontrar dados para o DDD ${normalizedCode}. ${errorMessage}`,
        });
      }
    };

    const timeoutId = setTimeout(fetchDDDData, 350);

    return () => clearTimeout(timeoutId);
  }, [normalizedCode, isEmpty, isValidCode]);

  if (isEmpty) {
    return {
      loading: false,
      data: null,
      error: null,
    };
  }

  if (!isValidCode) {
    return {
      loading: false,
      data: null,
      error: "DDD deve conter exatamente 2 dígitos numéricos",
    };
  }

  return state;
}
