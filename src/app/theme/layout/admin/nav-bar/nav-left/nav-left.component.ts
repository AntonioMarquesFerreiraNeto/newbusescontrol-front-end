// angular import
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {
  loggedUser!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe(
      response => this.loggedUser = response
    );
  }
}
