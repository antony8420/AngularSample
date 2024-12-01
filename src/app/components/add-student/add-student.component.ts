import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { Valuetype } from 'app/models/valuetype';
import { StudentsService } from 'app/services/students.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-student',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit , OnDestroy{
  studentForm:FormGroup;
  department:Valuetype[] =[];
  gender: Valuetype[] = [];
  submited =false;
  message: boolean = false;
  private destroy$ = new Subject<boolean>();
  constructor(private studentService:StudentsService){
    this.studentForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required, Validators.minLength(9)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      department: new FormControl('', [Validators.required]),
      gender: new FormControl('',[Validators.required])

})
    
  }

  ngOnInit(): void {
     this.studentService.getAllDepartment()
     .pipe(takeUntil(this.destroy$))
     .subscribe( data => (this.department =data))

     this.studentService.getGender()
     .pipe(takeUntil(this.destroy$))
     .subscribe( data => (this.gender =data))
  }

  hideeMessage(){
    this.message = false
  }
  SaveData(){
    
    
    console.log(this.studentForm.value)
    if(this.studentForm.invalid){
      return
    }
    this.submited = true
      this.studentService.saveStudent(this.studentForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe( data => {
        this.message = true;
        console.log("Data saved Successfully")
        this.studentForm.reset({});
      })
    
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
  }
}
