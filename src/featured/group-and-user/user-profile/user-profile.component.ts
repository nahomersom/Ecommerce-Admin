import { T } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { userProfile } from './user-profile-control';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends Base implements OnInit {

  public id = undefined;
  formGroup: FormGroup;
  userCredentialFormSubmitted = false;
  public isUpdate = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  groupList: any;
  public fields: any = { value: 'value', text: 'value' };
  public group_fields: any = { value: 'value', text: 'text' };
  disabled: boolean = false;
  constructor(
   private cdRef: ChangeDetectorRef,
   public crudService: CrudOperationService,
   private toastr: ToastrService,
   private location: Location,
   private  securityService?: SecurityService,

   
  ) {
    super(crudService)
    this.createForm();
    this.load_region();
  }


  ngOnInit(): void {

    this.id = this.securityService.securityObject.id;
  
    this.getGroup();

    if (this.id !== undefined) {
        this.isUpdate = true;
        this.crudService.detail(this.id, 'users/system/detail',true).subscribe((res: any) => {
          res.data.status = res.data.status === '1' ? true : false;
          this.formGroup.patchValue(res.data)
          this.formGroup.get('address').patchValue(res.data.address)
          this.load_city(res.data.address.region_id,res.data.address.city,this.formGroup,'address.city');     
          this.load_sub_city(res.data.address.city_id,res.data.address.sub_city,this.formGroup,'address.sub_city');

        });
      }

    this.sendingState$.subscribe(status => {
        this.sending = status;
        this.cdRef.detectChanges();
      });
}

  createForm(): void {

   this.formGroup =  this.createControls(userProfile);

  }

// to accept only number
numberOnly(event){
return this.crudService.convertInputToNumber(event);
}

  getGroup(){
    this.crudService.list('users/system/load_group').subscribe((res: any) => {
      this.groupList = res.data;
  });
}

Submit(){

if (this.formGroup.valid){

this.userCredentialFormSubmitted = true;
const payload = this.formGroup.value;
payload.group_id = this.securityService.securityObject.group_id;
this.disabled = true;
this.sending = true;
 this.crudService.post(payload, 'users/system').subscribe((res: any) => {
  
  if(res.status){
    this.toastr.success(res.message, 'Success');
    this.location.back();
   }
   else{
    this.toastr.error(res.message, 'Error');
   }
  this.disabled = false;
  this.sending = false;
})


}else {
this.userCredentialFormSubmitted = true;

return;
}
}



  }

