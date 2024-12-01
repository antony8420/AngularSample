import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsService } from 'app/services/students.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Valuetype } from 'app/models/valuetype';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit, OnDestroy {
  studentForm: FormGroup = new FormGroup({});
  studentId: any;
  message: boolean = false;
  department: Valuetype[] = [];
  gender: Valuetype[] = [];
  private destroy$ = new Subject<boolean>();
  constructor(private studentService: StudentsService, private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.studentId = this.router.snapshot.params['id'];
    console.log(this.studentId)
    this.studentService.getStudentByID(this.studentId).subscribe(
      data => {
        console.log(data)
        this.studentForm = new FormGroup({
          name: new FormControl(data.name, [Validators.required]),
          mobile: new FormControl(data.mobile, [Validators.required, Validators.minLength(9)]),
          email: new FormControl(data.email, [Validators.required, Validators.email]),
          department: new FormControl(data.department, [Validators.required]),
          gender: new FormControl(data.gender, [Validators.required])
        })
      }
    )

    this.studentService.getAllDepartment()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => (this.department = data))

    this.studentService.getGender()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => (this.gender = data))
  }

  hideeMessage() {
    this.message = false
  }

  SaveData() {

    if (this.studentForm.invalid) {
      return;
    }

    this.studentService.updateStudentByID(this.studentId, this.studentForm.value).subscribe(
      e => {

      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
