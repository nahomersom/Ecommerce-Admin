import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base } from '@core/utils/base';
import { Location } from '@angular/common';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import {systemUser} from './system-user-controls';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.css']
})
export class SystemUserComponent extends Base implements OnInit , OnDestroy {
  @ViewChild('tab')tab:TabComponent;
  id:any;
  formGroup: FormGroup;
  formSubmitted:boolean = false;
  public fields: any = { text: 'value', value: 'value' }
  public groupField: any = { text: 'text', value: 'value' }
  constructor(public crudService:CrudOperationService, public location: Location, public actRoute: ActivatedRoute , public httpCancelService: HttpCancelService) {
    super(crudService);
    this.createForm(); 
    let payload = {for:'system',project_type:'ecommerce'}
    this.load_group(payload);
    this.load_region();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id !== undefined){
      this.crudService.detail(this.id, 'users/System/detail').subscribe((res:any)=>{
        this.formGroup.patchValue(res.data)
        this.formGroup.get('address').patchValue(res.data.address)
        this.load_city(res.data.address.region_id,res.data.address.city,this.formGroup,'address.city');     
        this.load_sub_city(res.data.address.city_id,res.data.address.sub_city,this.formGroup,'address.sub_city');
      })
      
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.formGroup = this.createControls(systemUser);
  }
  nextTab(index){
    this.tab.select(index);
  }
  previousTab(index){
   if(index!=0){
    this.tab.select(1)
   }else{
     this.location.back();
   }
  }
  disableButton(){
  if(this.formGroup.get('full_name').invalid || this.formGroup.get('group_id').invalid || this.formGroup.get('status').invalid){
      this.tab.enableTab(1,false);
      return true;
        }
        else{
          this.tab.enableTab(1,true);
          return false;
        }
    }
  
  Submit($evt){
   let payload = this.formGroup.value;

   if(this.formGroup.valid){
     this.formSubmitted = true;
     this.crudService.submit(payload, 'users/System',null,$evt,this.formGroup)
   }
   else {
     this.formSubmitted = true;
   }
  }
}
