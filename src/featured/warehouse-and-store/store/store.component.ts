import { T } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {store} from 'featured/warehouse-and-store/store/store-controls'
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent extends Base implements OnInit , OnDestroy {
  storeFormGroup: FormGroup;
  formSubmitted: boolean = false;
  id:any = undefined;
  public fields: Object = { text: 'text', value: 'value'}
  public productFields = {value: 'id', text: 'category_name'};
  public categoryFields :Object = {  };
  selectedNode: any;
  selectedCategory:String = null;
  placeholder:string = 'select a category';
  categoryId: any;
  constructor(
    public crudService:CrudOperationService, 
    public actRoute: ActivatedRoute , 
    public httpCancelService:HttpCancelService,
    public security:SecurityService) { 

  super(crudService);
  this.createForm();
  this.load_warehouse(this.security.securityObject.id);
  // this.load_parent();


  }

  ngOnInit(): void {
    this.service.list('catalogue/category/load_parent').subscribe((res: any) => {
    
      this.parentCategoryList = res.data;
    })

    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'market/store/detail').subscribe((res: any)=>{
        
        this.storeFormGroup.patchValue(res.data)
        this.selectedCategory = res.data.category_name;
        this.categoryId = res.data.product_category_id;
        this.crudService.getControl(this.storeFormGroup,'product_category_id').patchValue([res.data.product_category_id])

      })
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
 
  }
  createForm(): void {
    this.storeFormGroup = this.createControls(store);
  }
  Submit($evt){
    let payload = this.storeFormGroup.value;
  
   payload.product_category_id = payload.product_category_id.id ?? this.categoryId;
   payload.status = payload.status  ? 1 : 0;
    if(this.storeFormGroup.valid){
    this.formSubmitted = true;
    this.crudService.submit(payload,'market/store',null,$evt,this.storeFormGroup)
    }
    else{
      this.formSubmitted = true;
    }
  }
}
