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
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }


  getStudents(Id: string)  {


  }


}
