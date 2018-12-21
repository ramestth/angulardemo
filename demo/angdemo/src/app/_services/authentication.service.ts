import {EventEmitter, Output, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from '../_models/user'
//import {AngularFireAuth} from 'angularfire2/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    User:any;
    authState: any = null;
    @Output() getLoggedInUser: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient) {
        //private afAuth: AngularFireAuth
         // this.afAuth.authState.subscribe(auth=>{
        //     this.authState = auth;
        // })
     }
 
    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:51199/api/Emp/Login', { UserName: username, Password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.User = JSON.parse(localStorage.getItem('currentUser'));
                this.getLoggedInUser.emit(this.User);
                return user;
            }));
    }
    
    register(user: User) {
      return this.http.post('http://localhost:51199/api/Emp/Register', user);
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.getLoggedInUser.emit(undefined);
    }

    // resetPassword(email: string) {
    //     return this.afAuth.auth.sendPasswordResetEmail(email)
    //       .then(() => console.log('sent Password Reset Email!'))
    //       .catch((error) =>{ console.log(error)
    //     });
    //   }
     
     resetPassword(email: string) {
        return this.http.get('http://localhost:51199/api/Emp/ForgotPassword?email='+email);
      }
     
      newPassword(token: string,password:string) {
        return this.http.get('http://localhost:51199/api/Emp/SavePassword?t='+token +'&p='+password);
      }

}