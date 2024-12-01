import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, first } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  submitted = false;

  loginForm:FormGroup;

  constructor(private userSerice: UserService ,
     private authService: AuthService,
     private route: ActivatedRoute,
     private router: Router){
        //redirect to home , if already logged id
        // if(this.authService.userValue){
        //   this.router.navigate(['/'])
        // }

        this.loginForm = new FormGroup({
          username: new FormControl('',[ Validators.required]),
          password: new FormControl('', [Validators.required])
      });
      
     }

  

  ngOnInit(): void {
   
  }

  signIn(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.username ?? '', this.loginForm.value.password ??'')
    .pipe(first())
    .subscribe({
        next: () => {
            // get return url from query parameters or default to home page
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            console.log(returnUrl)
            this.router.navigateByUrl('home');
        },
        error: error => {
            console.log(error)
        }
    });

      
  }


}
