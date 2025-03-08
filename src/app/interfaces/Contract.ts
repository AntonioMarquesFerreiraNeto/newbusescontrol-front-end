import { Bus } from "./Bus";
import { ContractDescription } from "./ContractDescription";
import { CustomerContract } from "./CustomerContract.";
import { Employee } from "./Employee";
import { SettingPanel } from "./SettingPanel";
import { Termination } from "./Termination";

export interface Contract 
{
    id: string;
    reference: string;
    busId: string;
    bus: Bus;
    driverId: string;
    driver: Employee;
    settingPanelId: string;
    settingPanel: SettingPanel;
    contractDescriptionId: string;
    contractDescription: ContractDescription;
    totalPrice: number;
    paymentType: string;
    details: string;
    installmentsCount?: number;
    createdAt: string;
    updatedAt?: string;
    startDate: string;
    terminateDate: string;
    status: string;
    isApproved: boolean;
    approverId: string;
    approver: Employee;
    customersCount: number;
    customersContract: CustomerContract[];
    terminations: Termination[];
}