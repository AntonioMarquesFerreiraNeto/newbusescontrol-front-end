// angular import
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pagination } from 'src/app/class/Pagination';
import { Notification } from 'src/app/interfaces/Notification';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  displaySeeMore: boolean;
  notifications: Notification[];
  pagination = new Pagination;

  constructor(private userService: UserService, private notificationService: NotificationService, private authService: AuthService, private snackbarService: SnackbarService) {
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

  fetchNotifications(isOpen: boolean) {
    if (!isOpen) {
      return;
    }
    this.pagination.page = 1;
    this.pagination.pageSize = 4;
    this.notificationService.getMyPaginated(this.pagination).subscribe((response) => {
      this.notifications = response.response;
      this.displaySeeMore = this.notifications.length != 0 ? true : false;
      this.displaySeeMore = response.totalSize <= this.notifications.length;
    });
  }

  seeMoreNotifications() {
    this.pagination.page = this.pagination.page + 1;
    this.notificationService.getMyPaginated(this.pagination).subscribe((response) => {
      this.notifications = this.notifications.concat(response.response);
      this.displaySeeMore = this.notifications.length != 0 ? true : false;
      this.displaySeeMore = response.totalSize <= this.notifications.length;
    });
  }

  getAvatarForNotification(notification: Notification) {
    if (notification.senderType == 'System') {
      return 'assets/images/user/avatar-2.jpg';
    }
    else {
      return notification.sender.gender == 'Male' ? 'assets/images/user/avatar-2.jpg' : 'assets/images/user/avatar-1.jpg';
    }
  }

  getNameSender(notification: Notification) {
    if (notification.senderType == 'System') {
      return 'Buses Control - Agent';
    }
    else {
      return notification.sender.name;
    }
  }

  getCreatedAtFormatted(createdAt: string) {
    return this.notificationService.formatedCreatedAt(createdAt);
  }
}
