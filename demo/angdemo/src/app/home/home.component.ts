import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { PagerService } from '../_services/pager.service';
import { ConfirmationDialogService } from '../_services/cofirmationdialog.service';
import { Router } from '@angular/router';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: Employee[] = [];
    //selectedFile: File=null;
    allItems: any[];
    pager: any = {};
    pagedItems: any[];
    pagelength:any;
     //pageOfItems: any[];
    previousurl:any;
    pagesize:any;
    searchText : string;
    constructor(private userService: EmployeeService,private confirmationDialogService: ConfirmationDialogService,private router:Router,private pagerService:PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.pagesize=2;
        this.loadAllUsers();
    }
 
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    edit(id:any){
       localStorage.setItem("id",id);
    }
 
    openConfirmationDialog(id:number) {
       this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to  Delete?')
       .then((confirmed) => {
           if(confirmed){
           this.deleteUser(id);
         }
        }
       )
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { 
            this.users = users; 
            this.allItems=this.users;
            this.pagesize=2;
            this.setPage(1,2);
        });
    }

    changePageSize(value:any){
        this.userService.getAll().subscribe(users => { 
            this.users = users; 
            this.allItems=this.users;
            this.pagesize=value;
            this.setPage(1,value);
        });
    }

    // onFileChanged(event) {
    //     this.selectedFile = event.target.files[0]
    //   }

    //   onUpload(id:any) {
    //       debugger
    //     // this.http is the injected HttpClient
    //     const file = new FormData();
    //     file.append('file', this.selectedFile, this.selectedFile.name);
    //     this.userService.uploadImage(id,file).subscribe(user => { 
    //         localStorage.removeItem('currentUser');
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     });
    //   }

      setPage(page: number,pageSize:number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page,pageSize);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex+1);
    }
    // onChangePage(pageOfItems: Array<any>) {
    //     // update current page of items
    //     this.pageOfItems = pageOfItems;
    // }



}   