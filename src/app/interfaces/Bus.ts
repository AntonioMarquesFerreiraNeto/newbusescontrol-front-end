import { Color } from "./Color"

export interface Bus
{
    id: string,
    colorId: string,
    color: Color,
    brand: string,
    name: string,
    manufactureDate: string,
    renavam: string, 
    licensePlate: string,
    chassi: string,
    seatingCapacity: string,
    status: string,
    availability: string 
}