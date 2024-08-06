// angular import
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  loggedUser!: User;
  profileImg: string;
  profileName: string;

  constructor(private userService: UserService, private authService: AuthService, private snackbarService: SnackbarService) {
    this.userService.getMyProfile().subscribe({
      next: (response) => {
        this.loggedUser = response;
        this.profileImg = this.loggedUser.employee?.gender == "Male" ? 'assets/images/user/avatar-2.jpg' : 'assets/images/user/avatar-1.jpg';
        this.profileName = this.loggedUser.employee.name;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });
  }

  Logout() {
    this.authService.Logout();
  }
}
