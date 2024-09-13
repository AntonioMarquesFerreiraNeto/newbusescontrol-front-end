import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { System } from 'src/app/interfaces/helpers/system';
import { SystemResponse } from 'src/app/interfaces/helpers/SystemResponse';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SystemService } from 'src/app/services/system.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-run-page',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './run-page.component.html',
  styleUrl: './run-page.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class RunPageComponent {

  system: System;
  systemResponse?: SystemResponse;

  constructor (private route: ActivatedRoute, private swalFireService: SwalFireService, private systemService: SystemService, private router: Router, private snackbarService: SnackbarService) {
    const id = this.route.snapshot.paramMap.get('id');

    var systemRecord = systemService.GetById(id);
    if(!systemRecord) 
    {
      snackbarService.Open('Rotina automatizada não encontrada');
      router.navigate(['/system/automated']);
    }
    
    this.system = systemRecord;
  }

  runSystem() {

    this.swalFireService.SwalLoading();

    this.systemService.RunSystem(this.system.route).subscribe({
      next: (response) => {
        this.swalFireService.Close();
        this.systemResponse = response;
        if(this.systemResponse.noOperation)
        {
          this.swalFireService.SwalInfo(this.systemResponse.noOperation);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
        this.router.navigate(['/system/automated']);
      }
    });
  }
}
