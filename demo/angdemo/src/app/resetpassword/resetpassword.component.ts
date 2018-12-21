import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  t:any;
  constructor(private formBuilder:FormBuilder,private alertService: AlertService,private userService: AuthenticationService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

     this.route.queryParams.subscribe(params => {
      this.t = params['uid'];
    });

    this.forgotForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
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
  
    this.userService.newPassword(this.t,this.forgotForm.controls["password"].value)
    .subscribe(
        data => {
            this.alertService.success('Password Saved Successfully', true);
            this.router.navigate(['/login']);
        },
        error => {
            this.alertService.error(error.error);
            this.loading = false;
        });
  }


}
