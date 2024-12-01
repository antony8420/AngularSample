import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnDestroy{
  signUpForm:FormGroup;
  submitted:boolean= false;
  message = ""
  private destroy$ = new Subject<boolean>();

  constructor(private userService: UserService){
    this.signUpForm = new FormGroup({
      username: new FormControl('',[ Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('Admin', [Validators.required]),

  });

  }

  signUp(){
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    this.userService.saveUser(this.signUpForm.value)
   .pipe(takeUntil(this.destroy$))
    .subscribe( data => {
      this.message = "Data Saved Succesfully";
      console.log("Data saved Successfully", data)
      this.signUpForm.reset({});
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
