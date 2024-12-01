import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-registration';
  userName:string = ''
  constructor(private authService:AuthService){
    
    authService.user$.subscribe(e => {
      console.log("AppComponent", e);
      //let data:any = e;

      this.userName = e != null ? e.userName : '' ;
    })
   
  }

  logout(){
    this.authService.logOut();
  }
}
