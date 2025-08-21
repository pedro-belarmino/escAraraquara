export interface UserType {
    id: string;
    name: string;
    registration: string;
    cpf: string;
    phone: string;
    email: string;
    setPassword: (password: string) => void;
    validatePassword: (password: string) => boolean;
}
//acessar pelo footer "sou chefe ou sla se vira meu tenho que entregar tudo de mão beijada agora?? se liga eu hein"