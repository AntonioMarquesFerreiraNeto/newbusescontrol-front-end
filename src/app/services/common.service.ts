import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private datePipe: DatePipe) { }

  getDateFormatted(date: string) {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() - 3);
    
    return this.datePipe.transform(dateObj, 'dd/MM/yyyy');
  }
  
  getDateTimeFormatted(date: string) {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() - 3);
    
    return this.datePipe.transform(dateObj, 'dd/MM/yyyy \'às\' HH:mm');
  }

  getDocumentFormatted(document: string) {
    if (document.length === 11) return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); 
    return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  getValueFormatted(value: number) {
    return (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  getPhoneNumberFormatted(value: string): string {
    return value.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
}
