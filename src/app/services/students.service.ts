import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'app/environment/environment';
import { Observable } from 'rxjs';
import { Student } from 'app/models/student';
import { Valuetype } from 'app/models/valuetype';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }
//http://localhost:3000/students
  getAllStudent(): Observable<Student[]>{
    return this.http.get<Student[]>(environment.apiUrl+"/students")
  }

  getAllDepartment():Observable<Valuetype[]>{
    return this.http.get<Valuetype[]>(environment.apiUrl+"/department")
  }

  getGender():Observable<Valuetype[]>{
    return this.http.get<Valuetype[]>(environment.apiUrl+"/gender")
  }

  saveStudent(data:any){
    return this.http.post(environment.apiUrl+"/students", data)
  }

  deleteStudent(id: any){
    return this.http.delete(environment.apiUrl+`/students/${id}`)
  }

  getStudentByID(id:any){
    return this.http.get<Student>(environment.apiUrl+`/students/${id}`)
  }

  updateStudentByID(id: any, data: Student){
    return this.http.put(environment.apiUrl+`/students/${id}`, data)
  }
}


