import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ApiUrl = environment.apiUrl+"api/v1/";
   user:User|undefined

  constructor(private http: HttpClient) {
    this.getUserFromDatabase()
                                               }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const request = { token, newPassword };
    return this.http.post(`${this.ApiUrl}auth/reset`,  request );
  }
                                                
  getUserFromDatabase(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}` // Include the Bearer token in the Authorization header
    });
    const url = `${this.ApiUrl}users`;
      // Send GET request with headers
      return this.http.get<any>(url, { headers }).pipe(
        tap((response:User) => {
           this.user=response
           this.setUserRole(this.user.role)
          console.log(response)
          return response
              })
      );

  }
  getToken(): string | null {
    return localStorage.getItem('access_token'); // Get the Bearer token from localStorage
  }
  isLoggedIn(): boolean {
    if(localStorage.getItem('access_token')){

    }else{
     this.logout()
    }
   return !!localStorage.getItem('access_token');
 }
 logout() {
  localStorage.removeItem('access_token');
  
} 
setUserRole(role:string){
  return localStorage.setItem('role',role); // Default to 'client'
}
getUserRole(): string {
  return localStorage.getItem('role') || ''; // Default to 'client'
}
sendForgotEmail(request:any):Observable<any>{
  return this.http.post(`${this.ApiUrl}auth/forgot-password`, request);
    }         
getUsersList():Observable<User[]>{
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}` // Include the Bearer token in the Authorization header
  });
  const url = `${this.ApiUrl}users/all`;
    // Send GET request with headers
    return this.http.get<User[]>(url, { headers }).pipe(
      tap((response:User[]) => {
  
        return response
            })
    );
}
}
