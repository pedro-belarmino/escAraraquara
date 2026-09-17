import type { Timestamp } from "firebase/firestore";

export const COMO_CONHECEU_OPTIONS = [
  "O(a) interessado(a) pela vaga já participou de algum Grupo Escoteiro",
  "Familiares",
  "Amigos",
  "Eventos",
  "Facebook",
  "Instagram",
  "Site",
  "Google",
];

export const TIPO_VAGA_OPTIONS = [
  "(7 A 10 ANOS) Lobinho - Sexo Masculino (período da manhã)",
  "(7 A 10 ANOS) Lobinha - Sexo Feminino (período da manhã)",
  "(7 A 10 ANOS) Lobinho - Sexo Masculino (período da tarde)",
  "(7 A 10 ANOS) Lobinha - Sexo Feminino (período da tarde)",
  "(11 A 14 ANOS) Escoteiro - Sexo Masculino (período da tarde)",
  "(11 A 14 ANOS) Escoteira - Sexo Feminino (período da tarde)",
  "(18 A 22 ANOS) Pioneiro - Ambos os sexos (período da manhã)",
  "(18 A 22 ANOS) Pioneiro - Ambos os sexos (período da tarde)",
];

export const GENERO_OPTIONS = ["Feminino", "Masculino", "Desejo não informar"];

export const CADASTRO_UNICO_OPTIONS = [
  "Não.",
  "Não, porém temos renda mensal menor que R$ 218,00 por pessoa.",
  "Sim.",
];

export const JA_SE_INSCREVEU_OPTIONS = ["Sim", "Não", "Outro"];

export const MOTIVO_CADASTRO_OPTIONS = [
  "Atividade complementar aos finais de semana",
  "Contato com a natureza",
  "Complemento da educação",
  "Complemento na formação como cidadão",
  "Desenvolvimento físico e intelectual",
  "Disciplina",
  "Indicação médica",
  "Indicação de amigos",
  "Ele(a) quer muito",
];

export const DISPONIBILIDADE_RESPONSAVEL_OPTIONS = [
  "Nenhuma disponibilidade.",
  "Sempre que puder.",
  "Total disponibilidade.",
];

export const CIENCIA_JOVEM_OPTIONS = [
  "Favorável",
  "Ciente mas não favorável",
  "Não ciente",
];

export const DEFICIENCIA_OPTIONS = [
  "Deficiência mental",
  "Deficiência física",
  "Não possui deficiência",
];

export const AVALIACAO_ITEMS = [
  "Facilidade em fazer novas amizades",
  "Educação com as pessoas ao seu redor",
  "Facilidade com contato com plantas e animais",
  "Vontade de aprender coisas novas",
  "Companheirismo e vontade de ajudar o próximo",
  "Respeito com raça, religião ou gênero",
  "Responsabilidade com tarefas assumidas",
];

export const RAMO_OPTIONS = ["Lobinhos", "Escoteiros", "Pioneiros"];

export const PERIODO_OPTIONS = ["Manhã", "Tarde"];

export interface PreInscricaoFormData {
  /* Sobre as vagas */
  cienteAviso: boolean;

  /* Como conheceu o Movimento Escoteiro */
  comoConheceu: string;

  /* Tipo da vaga */
  tipoVaga: string;

  /* Cadastro da criança/jovem */
  dataNascimento: string;
  nomeCompleto: string;
  genero: string;
  nomeResponsavel: string;
  telefoneContato: string;
  telefoneAdicional: string;
  emailContato: string;
  cadastroUnico: string;
  jaSeInscreveu: string;
  jaSeInscreveuOutro: string;
  motivoCadastro: string;
  disponibilidadeResponsavel: string;
  cienciaJovem: string;
  indicacaoGrupo: string;
  familiarInscrito: 'Sim' | 'Não' | '';

  /* Inscrição familiar */
  familiaresPreInscritos: string;

  /* Dados médicos */
  deficiencia: string;
  descricaoDeficiencia: string;
  avaliacaoJovem: Record<string, number>;
  observacoesGerais: string;
}

/** O createdAt chega como Timestamp do SDK, mas pode vir serializado em cache/export. */
export type FirestoreDate = Timestamp | { seconds: number } | string | Date;

export interface PreInscricaoSubmission extends PreInscricaoFormData {
  id?: string;
  createdAt?: FirestoreDate;
}
