import { Employee } from "./Employee";
import { SupportTicketMessage } from "./SupportTicketMessage";

export interface SupportTicket {
    id: string;
    reference: string;
    status: string;
    type: string;
    title: string;
    message: string;
    createdAt: string;
    employee: Employee;
    supportTicketMessages: SupportTicketMessage[];
}