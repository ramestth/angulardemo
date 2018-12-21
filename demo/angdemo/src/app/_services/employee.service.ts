import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from '../_models/employee'
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<Employee[]>('http://localhost:51199/api/Emp/GetEmployees');
    }
 
    getById(id: number) {
        return this.http.get('http://localhost:51199/api/Emp/GetEmployee?id=' + id);
    }

    updateuser(user: User) {
        return this.http.post('http://localhost:51199/api/Emp/PutUser', user);
    }
 
    post(user: Employee) {
      return this.http.post('http://localhost:51199/api/Emp/PostEmployee', user);
    }

    update(user: Employee) {
        return this.http.put('http://localhost:51199/api/Emp/PutEmployee?id=' + user.EmpId, user);
    }
 
    delete(id: number) {
        debugger
          return this.http.delete('http://localhost:51199/api/Emp/DeleteEmployee?id=' + id);
    }

    uploadImage(id:any,file:any){
        return this.http.post('http://localhost:51199/api/Emp/FileUpload?Id='+id,file)
    }
}
