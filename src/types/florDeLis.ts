export interface FlorDeLisFormData {
  jaFoiEscoteiro: 'Sim' | 'Não';
  anoEscoteiro?: string;
  paiOuResponsavel: 'Sim' | 'Não';
  nome: string;
  nomePreferido: string;
  endereco: string;
  celular: string;
  profissao: string;
  areaConhecimento: string;
  habilidades: string;
  contatosProfissionais: string;
  conheceLocalAcampamento: string;
  disponibilidade: string[];
  equipesApoio: string[];
  interesseGruposTrabalho: 'Sim' | 'Não';
  interesseOficinasPalestras: 'Sim' | 'Não';
  apenasApoiadorFinanceiro: 'Sim' | 'Não';
}

export interface FlorDeLisSubmission extends FlorDeLisFormData {
  id?: string;
  createdAt?: any;
}
