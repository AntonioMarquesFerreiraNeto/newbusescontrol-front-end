import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalFireService {

  constructor() { }

  SwalLoading(msg = null) {
    msg = msg != null ? msg : 'Estamos processando sua solicitação.';

    Swal.fire({
      title: '<h6>Por favor, aguarde...</h6>',
      html: `<p style="font-size: 12pt; margin: 0;">${msg}</p>`,
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  SwalError(message: string, onClose?: () => void) {
    Swal.fire({
      title: '<h6>Ops, algo deu errado...</h6>',
      html: `<p style="font-size: 12pt; margin: 0;">${message}</p>`,
      icon: 'error',
      customClass: {
        confirmButton: 'custom-button-swal rounded shadow-3 submit'
      }
    }).then(() => {
      if (onClose) {
        onClose();
      }
    });;
  }

  SwalSuccess(message: string, onClose?: () => void) {
    Swal.fire({
      title: '<h6>Ok, tudo certo!</h6>',
      html: `<p style="font-size: 12pt; margin: 0;">${message}</p>`,
      icon: 'success',
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton: 'custom-button-swal rounded shadow-3 submit',
        icon: 'custom-icon-swal'
      }
    }).then(() => {
      if (onClose) {
        onClose();
      }
    });
  }

  SwalInfo(message: string, onClose?: () => void) {
    Swal.fire({
      html: `<p style="font-size: 12pt; margin: 0;">${message}</p>`,
      icon: 'info',
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton: 'custom-button-swal rounded shadow-3 submit',
        icon: 'custom-icon-swal'
      }
    }).then(() => {
      if (onClose) {
        onClose();
      }
    });;
  }

  Close() {
    Swal.close();
  }
}
