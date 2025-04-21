import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './pages/contact/contact.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule, CommonModule, MatMenuModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class LandingpageComponent {
  minimumWidth = true;

  constructor(private modal: NgbModal){
    this.validaResolucaoBolean();
  }

  getDateYear() {
    var date = new Date();
    return date.getFullYear();
  }

  @HostListener('window:resize', ['$event'])
  validaResolucaoBolean() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 892) {
      this.minimumWidth = true
    } else {
      this.minimumWidth = false;
    }
  }

  openContact() {
    const style = {
      size: 'lg'
    };

    this.modal.open(ContactComponent, style);
  }
}
