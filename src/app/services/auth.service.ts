import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'app/environment/environment';
import { User } from 'app/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  private userSubject: BehaviorSubject<any>
  public user$: Observable<User>

  constructor(private http:HttpClient, private router:Router) { 
    let signedInUser = localStorage.getItem('user') ?? '{}';
    this.userSubject = new BehaviorSubject<any>(JSON.parse(signedInUser))
    this.user$ = this.userSubject.asObservable()
  }

  public get userValue():User{
      return this.userSubject.getValue();
  } 

  login(userName:string, pwd: string):Observable<any>{
    return this.http.get<User[]>(environment.apiUrl+`/users?userName=${userName}&password=${pwd}`)
    .pipe( map( userData => {
        localStorage.setItem('user', JSON.stringify(userData));
        this.userSubject.next(userData[0])
        return userData[0];
    } ))
  }

  logOut(){
    localStorage.removeItem('user')
    this.userSubject.next(null)
    this.router.navigate(['/login'])
  }

  isAuthenticated(){

  }
  
}
