import {Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
  userName: string;
  User:any;
  IsLoggedIn:any;
  Image:any;
  constructor(private authenticationService: AuthenticationService,private router:Router) {
      authenticationService.getLoggedInUser.subscribe(user => this.changeName(user));
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.User = JSON.parse(localStorage.getItem('currentUser'));
      this.userName = this.User.FirstName;
      this.Image= this.User.Image;
      this.IsLoggedIn=true;
  }
  else{
    this.userName = "Welcome";
    this.IsLoggedIn=false;
    this.Image=""; 
    }
  }
  private changeName(user: any): void {
    if(user){
      this.userName = user.FirstName;
      this.IsLoggedIn=true;
      this.Image=user.Image;
    }
    else{
    this.userName = "Welcome";
    this.IsLoggedIn=false;
    this.Image=""; 
  }
 }
 logout(){
   this.authenticationService.logout();
 }
}
