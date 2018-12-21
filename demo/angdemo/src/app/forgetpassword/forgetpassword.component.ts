import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private alertService: AlertService,private userService: AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.email]],
    });
  }

  get f() { return this.forgotForm.controls; }
   
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
        return;
    }
    this.loading = true;
    // this.userService.resetPassword(this.forgotForm.controls["username"].value)
    // .then(() =>  this.alertService.success('Please check your mail', true))
    // .catch((error) =>{
    //  this.alertService.error(error);
    //  })
  
    this.userService.resetPassword(this.forgotForm.controls["username"].value)
    .subscribe(
        data => {
            this.alertService.success('Please check your email', true);
            //this.router.navigate(['/login']);
        },
        error => {
            this.alertService.error(error.error);
            this.loading = false;
        });
  }
}
