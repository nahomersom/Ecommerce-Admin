import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject, Observable, Observer, throwError } from 'rxjs';

import { Base } from '@core/utils/base';
import { ToastrService } from 'ngx-toastr';
import { authenticate } from "authentication/login/authenticate-control";
import { CookieService } from 'ngx-cookie-service';
import { Data } from '@syncfusion/ej2-angular-grids';
import { catchError } from 'rxjs/operators';
import { T } from '@angular/cdk/keycodes';
import { CookieEncryptionService } from '@core/utils/cookie-encryption.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Base implements OnInit {
  loginFormGroup: FormGroup;
  formSubmitted = false; 
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  requestSend = false;
  disabled: boolean = false;
  accountBlockedMessage: String;
  accountBlocked:boolean = false;
  time:any;
  constructor(
   private cdRef: ChangeDetectorRef,
   private crudService: CrudOperationService,
   private router: Router,
   public security:SecurityService,    
  private toastr: ToastrService,
  private encryptDecryptCookie:CookieEncryptionService


  ) { 
    super(crudService);;
    this.createForm();
    this.toastr.toastrConfig.enableHtml = true;
    
  }
  
  ngOnInit(): void {
    
    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();
 
    });
  }
  
  createForm(): void {
    this.loginFormGroup = this.createControls(authenticate)
  }

  navigate(){
    this.router.navigateByUrl('authentication/find');
  }
Submit(){
  this.disabled = true;
  const payload = this.loginFormGroup.value;
  if(this.loginFormGroup.valid){
    this.requestSend = true;
    this.formSubmitted = true;
    this.crudService.post(payload, 'Account/Authentication/Login',true)
    .pipe(
     
      catchError((e: any) =>{
 
    this.requestSend = false;
    this.disabled = false;
    this.toastr.error('you\'re not connected to the network' );
        return throwError(e);
      }),
  )
       .subscribe((res: any) => {
      let status = res.message.status;
      if (res){
        if (!parseInt(status)){
        this.accountBlockedMessage = res.message.blocked;
        this.accountBlocked = true;
        }else{
          res.message.role = JSON.parse(res.message.role);
          this.security.securityObject = res.message;
          this.security.securityObject.notifications = {
            userRequest: { item: [], count: 0 },
            paymentOverdue: { item: [], count: 0 },
            expiredContract: { item: [], count: 0 },
            orders: { item: [], count: 0 },
          };
  
          if(payload.remember){
            this.crudService.setCookie(this.encryptDecryptCookie.encrypt(JSON.stringify(res.message)));
  
          }
  
          this.router.navigateByUrl('/ws');
  
        }
        }
      else {
        this.disabled = false;
        this.toastr.error(res.message, 'Error');
      }

      this.requestSend = false;
  }
  
  
  );

} else {
this.formSubmitted = true;
return;
}
  }

}

