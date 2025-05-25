import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router
  ) { }

  login(user: {email: string, password: string}) {
    interface LoginResponse {
      user:{
        Id: string,
        FirstName: string,
        LastName: string,
        Email: string,
        Password: string,
        
      }
      token: string
    }

    this.http.post<LoginResponse>("http://localhost:5058/api/Auth/login",
      {
        email: user.email,
        password: user.password
      }).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token ? response.token : ''); 
          localStorage.setItem('userId', JSON.stringify(response.user.Id));
          console.log("Login was succeed", response);
          this.router.navigate(["/dashboard"]);
          // return response; // החזרת התגובה מהשרת
        },
        error: (error) => {
          console.log('Error occurred:', error); // טיפול בשגיאות
        }
      })
  }

  logout() {
    
    this.router.navigate(["/login"])
  }
}
