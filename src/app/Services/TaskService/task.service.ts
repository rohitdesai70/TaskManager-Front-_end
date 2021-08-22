import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { task } from 'src/models/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  taskDetails = {};

  insertTask = (data: any) => {
    let body = JSON.stringify(data);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(
      `${environment.api_url}insert-tasks`,
      body,
      httpOptions
    );
  };

  getAllTasks = (data: String | null) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post<task>(
      `${environment.api_url}get-tasks`,
      { user_id: data },
      httpOptions
    );
  };

  deleteTask = (data: any) => {
    let body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(
      `${environment.api_url}delete-tasks`,
      body,
      httpOptions
    );
  };

  editDetails = (data: any) => {
    let body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post<task>(
      `${environment.api_url}edit-tasks`,
      body,
      httpOptions
    );
  };
}
