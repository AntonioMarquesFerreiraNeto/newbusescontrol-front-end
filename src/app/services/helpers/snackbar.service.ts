import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  Open(message: string, verticalValue: MatSnackBarVerticalPosition = 'top') {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      verticalPosition: verticalValue,
      horizontalPosition: 'center'
    });
  }
}
