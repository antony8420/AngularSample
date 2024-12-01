import { Injectable, OnInit } from '@angular/core';
import { HttpClient
 } from '@angular/common/http';
import { environment } from 'app/environment/environment';
import { User } from 'app/models/user';
import { filter, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData:User[]= [];
  constructor(private httpClient: HttpClient) { }


  getUsers(email:string, pwd:string): Observable<User[]>{
      return this.httpClient.get<User[]>(environment.apiUrl+`/users?email=${email}&pwd`);
      
  }

  
  saveUser(data:User){
    return this.httpClient.post(environment.apiUrl+"/users", data)
  }
}
