export interface Invoice {
    id: string;
    reference: string;
    financialId: string;
    title: string;
    description: string;
    totalPrice: number;
    price: number;
    interestRate: number;
    status: string;
    dueDate: string;    
    externalId: string;
    paymentMethod: string;
    paymentDate: string;
    createdAt: string;   
}  