import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;  
      return this.verifyLogin(url);
  }
  
  verifyLogin(url: string) : boolean{
    let isLogged : boolean = localStorage.getItem('isLoggedIn') == "true";

    if(!isLogged){
        this.router.navigate(['/login']);
      }
    return isLogged;
  }

}
