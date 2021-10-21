import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  downloadCv(directoryFile: string): Observable<Blob> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.get(environment.url_backend + 'blob/download/' + directoryFile,
      { headers: httpHeaders, responseType: 'blob' })
      .pipe(
        catchError(e => {
          this.isNotAuthorized(e);
          return throwError(e);
        })
      )
  }
}
