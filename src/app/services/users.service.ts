import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected http: HttpClient, private authService: AuthService, private router: Router,) { }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  get_all_user(): Observable<User[]> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    console.log(httpHeaders)
    return this.http.get<User[]>(environment.url_backend + 'user/getAll', { headers: httpHeaders }).pipe(
      catchError(e => {
        console.log(e)
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }
}


