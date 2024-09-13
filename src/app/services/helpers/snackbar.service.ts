import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  Open(message: string) {
    this.snackBar.open(message, "Fechar", {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
