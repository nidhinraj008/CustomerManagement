import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription } from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MenubarComponent } from 'src/app/layouts/menubar/menubar.component';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MenubarComponent
  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  subscription =  new Subscription;
  @ViewChild('close') close: any;

  customerList: any = [];
  selectedCustomer: any = {}
  cols: any[] = [];

  isLoading: boolean = false;
  isShowDeletionPopup: boolean = false;

  constructor(private customerService: CustomerService,
    private configService: ConfigService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.setTableData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setTableData() {
    this.cols = [
      { field: 'No', header: 'Sl. No.' },
      { field: 'name', header: 'Name' },
      { field: 'phone', header: 'Phone Number' },
      { field: 'email', header: 'Email' },
      { field: 'actions', header: 'Actions' },
    ];
  }

  public goToCustomerDetail(item: any) {
    this.router.navigate(['CustomerDetail',item.id]);
  }

  public deleteClick(item: any) {
    this.isShowDeletionPopup = true;
    this.selectedCustomer = item;
  }

  public deleteCustomer() {
    this.isLoading = true;
    this.subscription.add(this.customerService.deleteCustomer(this.selectedCustomer.id).subscribe((res: any) => {
      this.isLoading = false;
      if (res) {
        this.getAllCustomers();
        this.configService.notify('success', 'Deleted customer successfully');
        this.close.nativeElement.click();
      }
      
    }, (err: HttpErrorResponse) => {
      this.isLoading = false;

    }))    
  }

  public etitCustomer(item: any) {
    this.router.navigate(['/CustomerEdit',item.id])
  }

  private getAllCustomers() {
    this.isLoading = true;
    this.subscription.add(this.customerService.getAllCustomers().subscribe((res: any) => {
      this.isLoading = false;
      if (res.length) {
        this.customerList = res;
      }
      
    }, (err: HttpErrorResponse) => {
      this.isLoading = false;

    }))
  }


}
