import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResetPassword } from '../_Modelos/ResetPassword';
import { Response } from '../_Modelos/response';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private url: string = `${environment.HOST}/Auth`;
  constructor(private http:HttpClient, private router:Router) { }

  SendResetPassworLink(email:string): Observable<Response>{
    return this.http.put<Response>(`${this.url}/send-reset-email/${email}`,{});
  }

  resetPassword(resetPassword:ResetPassword): Observable<Response>{
    return this.http.put<Response>(`${this.url}/reset-password`, resetPassword);
  }

}
