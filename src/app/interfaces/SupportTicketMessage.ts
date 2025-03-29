import { Employee } from "./Employee";

export interface SupportTicketMessage 
{
    id: string;
    message: string;
    createdAt: string;
    supportAgent: Employee;
    isSupportAgent: boolean;
}