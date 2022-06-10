import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { changePassword } from './changePassword-controls';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends Base implements OnInit {

  changePasswordGroup: FormGroup;
  formSubmitted = false; 
  constructor(
 
   private cdRef: ChangeDetectorRef,
   public crudService: CrudOperationService,
   public security: SecurityService, 
   private toastr: ToastrService
  ) { 
    super(crudService);
    this.createForm();
  }
  

  ngOnInit(): void { }
    //validating the form
  createForm(): void {
    this.changePasswordGroup = this.createControls(changePassword);
  }


Submit(){
  let payload = this.changePasswordGroup.value;
  payload.id = this.security.securityObject.id; 
  if (this.changePasswordGroup.valid){
    this.formSubmitted = true;
    this.crudService.post(payload, 'Account/Authentication/change_password',true).subscribe( (res: any) => {
      if (res.status){
        this.toastr.success(res.message, 'Success');
        this.security.logout();
        this.security.securityObject = res.message;
        
         
      } else {
       
        this.toastr.error(res.message, 'Error');
      }
    
     });
    
    } else {
    this.formSubmitted = true;
    return;
    }
    }
    
}
