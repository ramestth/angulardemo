import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private Router:Router){
  }
  ngOnInit(){
     if(localStorage.getItem("currentUser")){
      this.Router.navigate(['/home']);
     }
     else{
      this.Router.navigate(['/login']);
     }
  }
}
