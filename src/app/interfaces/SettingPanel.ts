import { Employee } from "./Employee";

export interface SettingPanel
{
    id: string;
    reference: string;
    terminationFee: number;
    lateFeeInterestRate?: number;
    customerDelinquencyEnabled: boolean;
    limitDateTerminate?: number;
    parent: string;
    active: boolean;
    requesterId: string;
    requester: Employee;
    createdAt: string;
    updatedAt?: string;
}