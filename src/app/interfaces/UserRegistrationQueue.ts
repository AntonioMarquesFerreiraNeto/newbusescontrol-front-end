import { Employee } from "./Employee";

export interface UserRegistrationQueue {
    id: string;
    employeeId: string;
    employee: Employee;
    requesterId: string;
    requester: Employee;
    approvedId?: string;
    approved?: Employee;
    userId?: string;
    createdAt: string;
    updatedAt?: string;
    status: string;
}