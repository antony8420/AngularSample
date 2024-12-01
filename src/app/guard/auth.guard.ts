import { Injectable } from '@angular/core';
import { CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { ActivatedRouteSnapshot,
       RouterStateSnapshot,
       CanActivate,
      Router } from '@angular/router'
import { AuthService } from 'app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userValue;
   
    if( user ){ // User is authenticated
        console.log("User", user)
        console.log("Route", route?.data)

        
        if(route.data?.['roles'][0].indexOf(user.role) === -1 ){ // UN Authorization
            this.router.navigate(['unauthorized'])
            return false;
        }
        
        return true//Authorized ..!
      
    }

    return false;
    
  }
  
}

