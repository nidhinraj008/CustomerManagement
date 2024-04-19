import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MenubarComponent } from 'src/app/layouts/menubar/menubar.component';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MenubarComponent,
  ],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  subscription =  new Subscription;
  customerId: number = 0;
  customerDetails: any;
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parm: any) => {
      this.customerId = parm.get('id')
      if (this.customerId) {
        this.getCustomerDetails()
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  public etitCustomer() {
    this.router.navigate(['/CustomerEdit',this.customerDetails.id])
  }

  private getCustomerDetails() {
    this.isLoading = true;
    this.subscription.add(this.customerService.getCustomerDetails(1).subscribe((res: any) => {
      this.isLoading = false;
      if (res?.id) {
        this.customerDetails = res;
      }
      
    }, (err: HttpErrorResponse) => {
      this.isLoading = false;

    }))
  }
}
