import { Customer } from "./Customer";
import { Invoice } from "./Invoice";
import { Supplier } from "./Supplier";

export interface Financial {
    id: string;
    reference: string;
    contractId: string;
    settingPanelId: string;
    title: string;
    description: string;
    totalPrice: number;
    price: number;
    totalInterestRate: number;
    installmentsCount: number;
    active: boolean;
    type: string;
    paymentType: string;
    startDate: string;
    terminateDate: string;
    createdAt: string;
    customerId: string;
    customer: Customer;
    supplierId: string;
    supplier: Supplier;
    invoices: Invoice[];
}