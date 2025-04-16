import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [BrowserModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class TicketsComponent {
  onCardMoved(event: any) {
    console.log('Card moved:', event);
  }

  onCardClick(event: any) {
    console.log('Card clicked:', event);
  }

  onColumnMoved(event: any) {
    console.log('Column moved:', event);
  }
}
