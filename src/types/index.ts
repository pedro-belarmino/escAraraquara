// ROLES
export enum Role {
  DESENVOLVEDOR = "DESENVOLVEDOR",
  DIRETOR = "DIRETOR",
  CHEFE = "CHEFE",
}

// USER
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  branch?: string; // For CHEFE role
}

// BRANCHES
export enum Branch {
  FILHOTE = "Filhote",
  LOBINHO = "Lobinho",
  ESCOTEIRO = "Escoteiro",
  SENIOR = "Sênior",
  PIONEIRO = "Pioneiro",
}

// SECTIONS
export enum Section {
  // Lobinho
  ALCATEIA_MOGLI = "Alcateia Mogli",
  ALCATEIA_HATI = "Alcateia Hati",
  // Escoteiro
  TROPA_CAIAPOS = "Tropa Caiapós",
  TROPA_XAVANTES = "Tropa Xavantes",
  TROPA_GUARANI = "Tropa Guarani",
  // Sênior
  TROPA_SENIOR = "Tropa Sênior",
  // Pioneiro
  CLA_GUARDIOS_DO_SOL = "Clã Guardiões do Sol",
}

// FORM STATUS
export enum FormStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

// YOUTH APPLICATION FORM
export interface YouthApplicationForm {
  id: string;
  memberName: string;
  age: number;
  branch: Branch;
  section: Section;
  cpf: string;
  responsibleName?: string;
  memberContact: string;
  responsibleContact?: string;
  timestamp: Date;
  status: FormStatus;
}

// ADULT VOLUNTEER ROLES
export enum AdultVolunteerRole {
  ESCOTISTA = "Escotista",
  DIRIGENTE = "Dirigente",
}

// DIRIGENTE AREAS
export enum DirigenteArea {
  ADMINISTRATIVE = "Administrativo",
  FINANCIAL = "Financeiro",
  INFRASTRUCTURE = "Infraestrutura",
}

// ADULT VOLUNTEER FORM
export interface AdultVolunteerForm {
  id: string;
  fullName: string;
  age: number;
  desiredRole: AdultVolunteerRole;
  section?: Section; // If desiredRole is ESCOTISTA
  area?: DirigenteArea; // If desiredRole is DIRIGENTE
  timestamp: Date;
  status: FormStatus;
}

// AUTHORIZED EMAIL
export interface AuthorizedEmail {
  email: string;
  role: Role;
}