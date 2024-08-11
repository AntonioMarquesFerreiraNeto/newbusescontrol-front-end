import { Employee } from "./Employee";

export interface Notification 
{
    id: string;
    senderId: string;
    sender: Employee;
    title: string;
    message: string;
    accessLevel : string;
    senderType: string;
    createdAt: string;
}