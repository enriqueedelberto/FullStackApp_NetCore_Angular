import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Student } from './model/StudentModel';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
   }


  getStudents(): Observable<Array<Student>> {

    const url = `${this.apiUrl}student`;
    return this.http.get<Array<Student>>(url, {
      headers: this.headers
    });

  }


  getStudentDetail(Id: string): Observable<Student> {

    const url = `${this.apiUrl}student/${Id}`;
    return this.http.get<Student>(url, {
      headers: this.headers
    });

  }

  saveStudent(student: Student) {
    const url = `${this.apiUrl}student/${student.Id}`;

    return this.http.post<any>(url, student,{
      headers: this.headers
    });
  }

  updateStudent(student: Student) {
    const url = `${this.apiUrl}student/${student.Id}`;

    return this.http.put<any>(url, student,{
      headers: this.headers
    });
  }

 deleteStudent(Id: string) {
  const url = `${this.apiUrl}student/${Id}`;

  return this.http.delete<any>(url, {
    headers: this.headers
  });
}


}
