import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../_services/employee.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userform: FormGroup;
  loading = false;
  submitted = false;
  User:any;
  ImagePath:any;
  Image:string;
  constructor(private formBuilder: FormBuilder,private userService:EmployeeService,private router:Router,private activatedroute:ActivatedRoute,private alertService:AlertService) { }

  ngOnInit() {
    this.userform = this.formBuilder.group({
      Id:[],
      UserName: [],
      Password: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Image:[]
   });
 
      
    this.User = JSON.parse(localStorage.getItem('currentUser'));
    this.userform.setValue(this.User);
    this.Image=this.User.Image;
    this.userform.controls["Image"].setValue(this.Image.split('/')[5]);
    this.ImagePath=this.User.Image;
  }

  // convenience getter for easy access to form fields
  get f() { return this.userform.controls; }

  onFileChanged(event) {
    if(event.target.files[0]){
       // this.http is the injected HttpClient
    const file = new FormData();
    file.append('file', event.target.files[0], event.target.files[0].name);
    this.userService.uploadImage(this.User.Id,file).subscribe(user => { 
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.User = JSON.parse(localStorage.getItem('currentUser'));
        this.ImagePath=this.User.Image;
        this.alertService.success('Image Updated successfully', true);
        location.reload();
      });
    }
  }


  onSubmit() {
      this.submitted = true;
    // stop here if form is invalid
    if (this.userform.invalid) {
        return;
    }

    this.loading = true;
    this.userService.updateuser(this.userform.value)
        .subscribe(
            data => {
                this.alertService.success('Updated successfully', true);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertService.error(error.error);
                this.loading = false;
            });
 }
}
