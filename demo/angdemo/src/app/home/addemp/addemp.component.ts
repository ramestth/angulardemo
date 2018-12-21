import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../_services/employee.service';
import { AlertService } from '../../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent implements OnInit {
  empform: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private userService:EmployeeService,private alertService:AlertService,private router:Router ) { }

  ngOnInit() {
    this.empform = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      empcode: ['', Validators.required],
      position: ['', Validators.required],
      office: ['', Validators.required]
  });
  }
     // convenience getter for easy access to form fields
     get f() { return this.empform.controls; }

     onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.empform.invalid) {
          return;
      }

      this.loading = true;
      this.userService.post(this.empform.value)
          .subscribe(
              data => {
                  this.alertService.success('Added successfully', true);
                  this.router.navigate(['/home']);
              },
              error => {
                  this.alertService.error(error.error);
                  this.loading = false;
              });
  }

}
