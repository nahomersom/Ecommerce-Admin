import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root',
})
export class AppUserAuth {
  id: string;
  full_name: string;
  token: string;
  role?: RoleModel[] = [];
  is_supplier: boolean;
  group_id:string;
  notifications?:Notification;
}

export interface RoleModel {
  title: string;
  page: string;
  canAdd: any;
  canUpdate: any;
  canDelete: any;
  canView: any;
  canViewDetail: any;

}
export interface Notification {
  userRequest?: any;
  paymentOverdue?: any;
  expiredContract?: any;
  orders?: any;
}

@Injectable()
export class SecurityService {
  [x: string]: any;
 //  securityObject: AppUserAuth;
  securityObject: AppUserAuth = {
    // id: '61b48d106d9d8439364344',
    id: '620246cc7bf1e453581085',
    full_name: 'nahom',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjYxODM3MmY4YjBhY2Q5NDI0ODM3MzMi.ir9iu301XjJMyGYtQxqkfRS5DhwtUfDJ21EAidTUsCk',
    role: [],
    is_supplier: true,
    group_id: '',
    notifications:{}
  };
  //to clear the interval when the user logout
  public intervals;
  
  //securityObject: any;
  constructor(public security: ToastrService, public crud_service: CrudOperationService,private router: Router) {}

  gridAction(page: string) {
    return { edit: this.hasClaim(page, 'canUpdate'), delete: this.hasClaim(page, 'canDelete'), view: this.hasClaim(page, 'canViewDetail') };
  }

  hasClaim(page: string, action: string) {
    let truth = false;
    
    for (let element of this.securityObject.role) {
      if((element.page).toLowerCase() === page.toLowerCase()){
        element[action] ? truth = true : null; 

        break;
      }
    }

    return true;

  }
  
  public  logout() {
    document.cookie = "loginDetail=;expires=expires=Thu, 01 Jan 1970 00:00:00 GMT"; 

    this.crud_service.list('util/dashboard/logout').subscribe((res: any) => {
      clearInterval(this.intervals);
      window.location.replace("authentication/login");
      this.crud_service.deleteCookie();
      this.securityObject = null;
    });

  }


}
