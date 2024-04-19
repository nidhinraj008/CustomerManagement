import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  isShowToast: boolean = false;
  toastData: any = {
    color: "",
    backgroundColor: "",
    icon: "",
    message: ""
  }

  constructor() { }

  public notify(tostType: string, message: any) {
      switch (tostType) {
        case "info":
          this.toastData.color = "#084298";
          this.toastData.backgroundColor = "#cfe2ff";
          this.toastData.icon = "bi-exclamation-circle";
          break;
        case "success":
          this.toastData.color = "#165537";
          this.toastData.backgroundColor = "#d1e7dd";
          this.toastData.icon = "bi-check-circle";
          break;
        case "error":
          this.toastData.color = "#842029";
          this.toastData.backgroundColor = "#f8d7da";
          this.toastData.icon = "bi-x-circle";
          break;
        case "warning":
          this.toastData.color = "#664d03";
          this.toastData.backgroundColor = "#fff3cd";
          this.toastData.icon = "bi-exclamation-triangle";
          break;
      }
    this.toastData.message = message;
    this.isShowToast = true;

    setTimeout(() => {
      this.isShowToast = false;
    }, 3000)
  }    
}
