import { SavedCardRequest } from "./SavedCardRequest";

export interface InvoiceRequestPayment 
{
    paymentMethod: string;
    creditCard: SavedCardRequest;
}