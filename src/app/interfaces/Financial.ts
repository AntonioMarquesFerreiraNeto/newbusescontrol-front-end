import { Customer } from "./Customer";
import { Invoice } from "./Invoice";

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
    invoices: Invoice[];
}