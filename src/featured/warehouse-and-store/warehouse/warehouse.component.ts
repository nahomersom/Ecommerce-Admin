
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {warehouse} from 'featured/warehouse-and-store/warehouse/warehouse-controls';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends Base implements OnInit , OnDestroy {
  formGroup:FormGroup;
  id:any = undefined;
  formSubmitted:boolean = false;
  public fields: any = { text: 'value', value: 'value' };
  constructor(public crudService:CrudOperationService, public securityService:SecurityService, public actRoute: ActivatedRoute, public httpCancelService:HttpCancelService) { 
    super(crudService);
    this.createForm();
    this.load_region();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'market/warehouse/detail').subscribe((res: any)=>{
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
    this.formGroup = this.createControls(warehouse)
  }
  Submit($evt){
    let payload = this.formGroup.value;
    if(this.securityService.securityObject.is_supplier){
 
    payload.supplier_id = this.securityService.securityObject.id;
   
    }
    if(this.formGroup.valid){
      this.formSubmitted = true;
      this.crudService.submit(payload,'market/warehouse',null,$evt,this.formGroup)
    }
    else{
      this.formSubmitted = true;
    }
  }
}
