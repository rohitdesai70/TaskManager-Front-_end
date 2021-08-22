import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  userLogin = (data: any) => {
    let body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<user>(
      `${environment.api_url}sign-in`,
      body,
      httpOptions
    );
  };

  Logout = () => {
    localStorage.clear();
    return true;
  };

  signIn = (data: any) => {
    let body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      `${environment.api_url}insert-user`,
      body,
      httpOptions
    );
  };
}
