import { Contract } from "./Contract";
import { Customer } from "./Customer";

export interface Termination 
{
    id: string;
    contractId: string;
    contract: Contract;
    customerId: string;
    customer: Customer;
    price: number;
    createdAt: string;
}