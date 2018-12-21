import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService,FacebookLoginProvider} from 'angular-6-social-login';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';

 
@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    socialPlatformProvider:any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService, private socialAuthService: AuthService,private Router:Router) {}
 
    ngOnInit() {
        if(localStorage.getItem("currentUser")){
          this.Router.navigate(['/home']);
        }
        else
        {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
 
        // reset login status
       // this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      }
    }
 
    public socialSignIn(socialPlatform : string) {
         this.socialPlatformProvider;
        if(socialPlatform == "facebook"){
            this.socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(this.socialPlatformProvider).then(
          (userData) => {
            console.log(socialPlatform+" sign in data : " , userData);
            //if facebook id does not exist for current user then insert the facebookid from userdata to user table and simply
            //on the basis of user credentials make the login.
          }
        );
      }


    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
 
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
 
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error.error);
                    this.loading = false;
                });
    }
}