import { CanActivateFn } from '@angular/router';

export const noAuthGuardGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('access_token');
  if(accessToken.length != 0){
    window.location.assign('/home');
    return false;
  }
  return true;
};
