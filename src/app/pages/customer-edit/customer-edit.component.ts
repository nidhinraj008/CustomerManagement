import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from 'src/app/layouts/menubar/menubar.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    CommonModule,
    MenubarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {
  
  customerForm!: FormGroup;
  subscription =  new Subscription;

  customerId: number = 0;
  customerDetails: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.extractId();
    this.initCustomerForm();
  }

  private extractId() {
    this.activatedRoute.paramMap.subscribe((parm: any) => {
      this.customerId = parm.get('id');
      if (this.customerId > 0) {
        this.getCustomerDetails()
      } else {
        this.initCustomerForm();
        this.customerDetails = {};
      }
    })
  }

  private initCustomerForm() {
    this.customerForm = this.fb.group({
      Name: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      Phone: ["", [Validators.required]],
      Website: ["", [Validators.required]],
      Username: ["", [Validators.required]],
      CompanyName: ["", [Validators.required]],
      Business    : ["", [Validators.required]],
      CatchPhrase: ["", [Validators.required]],
    })
  }

  private setEditForm() {
    this.customerForm.get('Name')?.setValue(this.customerDetails?.name ?? "");
    this.customerForm.get('Email')?.setValue(this.customerDetails?.email ?? "");
    this.customerForm.get('Phone')?.setValue(this.customerDetails?.phone ?? "");
    this.customerForm.get('Website')?.setValue(this.customerDetails?.website ?? "");
    this.customerForm.get('Username')?.setValue(this.customerDetails?.username ?? "");
    this.customerForm.get('CompanyName')?.setValue(this.customerDetails?.company?.name ?? "");
    this.customerForm.get('Business')?.setValue(this.customerDetails?.company?.bs ?? "");
    this.customerForm.get('CatchPhrase')?.setValue(this.customerDetails?.company?.catchPhrase ?? "");
  }

  public onSubmitClick() {
    this.customerForm.markAllAsTouched();
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe((res: any) => {
        this.isLoading = false;
        if (res) {
          this.configService.notify('success', 'Updated successfully');
        } else {
          this.configService.notify('error', 'Update failed');
        }
      }, (err: HttpErrorResponse) => {
        this.isLoading = false;
      })
    } else {
      this.configService.notify('warning', 'Invalid data')
    }
  }

  // API
  private getCustomerDetails() {
    this.isLoading = true;
    this.subscription.add(this.customerService.getCustomerDetails(this.customerId).subscribe((res: any) => {
      this.isLoading = false;
      if (res?.id) {
        this.customerDetails = res;
        this.setEditForm();
      }
    }, (err: HttpErrorResponse) => {
      this.isLoading = false;
    }))
  }

}
