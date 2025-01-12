import { Contract } from "./Contract";
import { Customer } from "./Customer";

export interface CustomerContract 
{
    id: string;
    contractId: string;
    contract: Contract;
    customerId: string;
    customer: Customer;
    processTermination: boolean;
    processTerminationDate?: string;
    active: boolean;
}