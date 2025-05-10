export interface SavedCardRequest 
{
    holderName: string;
    holderCpfCnpj: string;
    holderEmail: string;
    holderMobilePhone: string;
    holderPostalCode: string;
    holderAddressNumber: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    securityCode: string;
}