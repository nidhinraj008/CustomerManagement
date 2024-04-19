import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  public getAllCustomers() {
    const url = this.baseUrl + '/users';
    return this.http.get(url);
  }

  public getCustomerDetails(id: number) {
    const url = this.baseUrl + '/users/' + id;
    return this.http.get(url);
  }

  public addCustomer(param: any) {
    const url = this.baseUrl + '/users';
    return this.http.post(url, param);
  }

  public deleteCustomer(id: number) {
    const url = this.baseUrl + '/users/'+ id;
    return this.http.delete(url);
  }
}
