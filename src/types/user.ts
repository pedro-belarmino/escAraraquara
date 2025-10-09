import { Branch } from './branches';

export type Role = 'DESENVOLVEDOR' | 'DIRETOR' | 'CHEFE';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: Role;
  photoURL: string;
  branch?: Branch;
}