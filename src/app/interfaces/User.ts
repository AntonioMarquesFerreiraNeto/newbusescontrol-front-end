import { Employee } from "./Employee"

export interface User 
{
    id: string;
    employeeId: string;
    employee?: Employee;
    role: string;
    nickName: string;
    email: string;
}