import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../_services/employee.service';
import { AlertService } from '../../_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css']
})
export class EditempComponent implements OnInit {
  empform: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private userService:EmployeeService,private alertService:AlertService,private router:Router,private activatedroute:ActivatedRoute ) { }

  ngOnInit() {

    this.empform = this.formBuilder.group({
      EmpId:[],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmpCode: ['', Validators.required],
      Position: ['', Validators.required],
      Office: ['', Validators.required]
  });
    const id = localStorage.getItem("id");
    this.userService.getById(+id).subscribe(data=>{
    this.empform.setValue(data);
    });
  }
     // convenience getter for easy access to form fields
     get f() { return this.empform.controls; }

     remove(){
       localStorage.removeItem("id");
     }

     onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.empform.invalid) {
          return;
      }

      this.loading = true;
      this.userService.update(this.empform.value)
          .subscribe(
              data => {
                  localStorage.removeItem("id");
                  this.alertService.success('Updated successfully', true);
                  this.router.navigate(['/home']);
              },
              error => {
                  this.alertService.error(error.error);
                  this.loading = false;
              });
  }
}
