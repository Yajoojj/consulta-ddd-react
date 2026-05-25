export interface DDDResponse {
  state: string;
  area_code: string;
  cities: string[];
}

export interface DDDSearchState {
  dddCode: string;
  loading: boolean;
  data: DDDResponse | null;
  error: string | null;
}
