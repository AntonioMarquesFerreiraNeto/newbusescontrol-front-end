export interface Customer
{
    id: string; 
    name: string;
    cpf?: string; 
    cnpj?: string; 
    birthDate?: string; 
    openDate?: string; 
    email: string;
    phoneNumber: string;
    homeNumber: string;
    logradouro: string;
    complementResidential: string;
    neighborhood: string;
    city: string;
    state: string;
    active: boolean;
    type: string; 
    gender?: string; 
    externalId: string;
}