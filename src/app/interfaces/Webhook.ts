export interface Webhook 
{
    id: string;
    name: string;
    email: string;
    url: string;
    sendType: string;
    enabled: boolean;
    interrupted: boolean;
    events: string[];
    apiVersion: number;
    type: string;
    createdAt: string;
    updatedAt?: string;
}