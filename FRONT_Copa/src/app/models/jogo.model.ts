import { Selecao } from "./selecao.model";

export interface Jogo {
  id?: number;
  selecaoA?: Selecao;
  selecaoB?: Selecao;
  placarTimeA?: number;
  placarTimeB?: number;
  criadoEm?: string;
}
