import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  login :any
  constructor(private service : AuthService  , private route : Router){
  }


  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      this.service.getRole().subscribe((res:any) => {
            if(res!.username) {
              this.login = res
          }
            })

      if (this.login?.username){

        return true
      }else{
        this.route.navigate(['/login'])
        return  false



      }
    }

}


