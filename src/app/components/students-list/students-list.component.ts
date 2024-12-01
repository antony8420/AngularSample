import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from 'app/services/students.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit, OnDestroy{
  constructor(private student: StudentsService){}
  studentData:any=[];
  private destroy$ = new Subject<boolean>();

  ngOnInit(): void {
     this.student.getAllStudent()
     .pipe(takeUntil(this.destroy$))
     .subscribe( data => (this.studentData =data))
  }

  deleteStudent(id:any): void{

    this.student.deleteStudent(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe( data =>{ 
      console.log("Deleted successfully")
      this.ngOnInit()
    } )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
