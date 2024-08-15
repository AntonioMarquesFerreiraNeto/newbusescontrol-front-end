import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { System } from 'src/app/interfaces/helpers/system';
import { SystemService } from 'src/app/services/system.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-system-automated',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './system-automated.component.html',
  styleUrl: './system-automated.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class SystemAutomatedComponent {

  constructor(private systemService: SystemService) 
  {
    this.list = this.systemService.GetAll();
    this.defaultList = this.list;
  }

  list: System[];
  defaultList: System[];

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (value.length == 0) {
      this.list = this.defaultList;
    }
    else {
      value = value.toLowerCase();
      this.list = this.defaultList.filter(x => x.title.toLowerCase().includes(value));
    }
  }
}
