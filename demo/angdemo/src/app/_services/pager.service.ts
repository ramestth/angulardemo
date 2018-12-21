import { Injectable } from '@angular/core';
import { range } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PagerService {
  totalPages:any;
  startPage:any
  endPage:any;
  startIndex:any;
  endIndex:any;
  pages:any={};
  
  constructor() { }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
      debugger
    // calculate total pages
    this.totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > this.totalPages) { 
        currentPage = this.totalPages; 
    }
     
    if (this.totalPages <= 10) {
        // less than 10 total pages so show all
        this.startPage = 1;
        this.endPage = this.totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            this.startPage = 1;
            this.endPage = 10;
        } else if (currentPage + 4 >= this.totalPages) {
            this.startPage = this.totalPages - 9;
            this.endPage = this.totalPages;
        } else {
            this.startPage = currentPage - 5;
            this.endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
     this.startIndex = (currentPage - 1) * pageSize;
     //this.endIndex = Math.min(this.startIndex + pageSize - 1, totalItems - 1);
     this.endIndex = this.startIndex+(pageSize-1);


    // create an array of pages to ng-repeat in the pager control
    this.pages = Array.from(Array((this.endPage + 1) - this.startPage).keys()).map(i => this.startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: this.totalPages,
        startPage: this.startPage,
        endPage: this.endPage,
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        pages: this.pages
    };
}
}
