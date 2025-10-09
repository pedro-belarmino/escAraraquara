import { Branch, Section } from './branches';

export type FormStatus = 'pending' | 'accepted' | 'rejected';

export interface YouthApplication {
  id: string;
  memberName: string;
  age: number;
  branch: Branch;
  section: Section;
  cpf: string;
  responsiblePersonName?: string;
  memberContact: string;
  responsibleContact?: string;
  timestamp: Date;
  status: FormStatus;
}

export type AdultVolunteerRole = 'Escotista' | 'Dirigente';
export type DirigenteArea = 'administrative' | 'financial' | 'infrastructure';

export interface AdultVolunteerApplication {
  id: string;
  fullName: string;
  age: number;
  desiredRole: AdultVolunteerRole;
  preferredSection?: Section;
  preferredArea?: DirigenteArea;
  timestamp: Date;
  status: FormStatus;
}