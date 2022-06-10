import { T } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {inventory} from 'featured/warehouse-and-store/inventory/inventory-controls'
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends Base implements OnInit , OnDestroy {
  public dateValue: Date = new Date();
  inventoryFormGroup: FormGroup;
  formSubmitted: boolean = false;
  id:any = undefined;
  public fields: Object = { text: 'text', value: 'value'}
  public inventoryStatus:Array<Object> = [{text:'Issued',value:'issue'},{text:'Received',value:'received'}]
  supplier_id: string;
  product_title: string;
  inventoryStatusValue: any;
  product_variant_id: any;
  productData:any;
  placeholder:string;
  constructor(public httpCancelService:HttpCancelService ,public crudService: CrudOperationService,public actRoute: ActivatedRoute,private securityService: SecurityService) {
    super(crudService);
    this.createForm();
    this.load_warehouse(this.securityService.securityObject.id);

  }

  ngOnInit(): void {
    console.log(this.securityService.id)
    this.placeholder = 'select product';
    this.inventoryFormGroup.get('product_variant_id').disable();
    if(this.securityService.securityObject.is_supplier){
      
      this.supplier_id = this.securityService.securityObject.id;
     
      }
    this.id = this.actRoute.snapshot.params.id;
   if(this.id != undefined){
    this.inventoryFormGroup.get('product_variant_id').enable();
     this.crudService.detail(this.id,'market/inventory/detail').subscribe((res: any)=>{
       this.inventoryFormGroup.patchValue(res.data);
       this.product_title = res.data.product[0].title;
       this.productData = [{text:this.product_title, value:this.product_title}]
        
      this.inventoryFormGroup.get('inventory_status').setValue(res.data.inventory_status)
      this.product_variant_id = res.data.product_variant_id; 
      if(res.data.product_variant_id){
        this.load_variant(res.data.product_id,res.data.product_variant_id);
       } else {
        this.inventoryFormGroup.get('product_variant_id').disable();
       }
      
       this.load_store(res.data.ware_house_id,res.data.store_id,this.inventoryFormGroup);
       console.log(this.inventoryFormGroup.value)
     })
   }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
   this.inventoryFormGroup = this.createControls(inventory)
  }
  onProductSelect(itemData){
    console.log(itemData)
    if(itemData){
      this.product_title = null;
      if(itemData.has_variant == "0"){
        this.inventoryFormGroup.get('product_variant_id').setValue(null);
        this.inventoryFormGroup.get('product_variant_id').disable();
     
     }else{
      this.inventoryFormGroup.get('product_variant_id').enable();
       this.load_variant(itemData.value);
     }

    }


  }
  load_variant(productId,variantId = null){
    this.service.list('catalogue/product/load_variant/'+productId).subscribe((res: any)=>{
      this.variantList = res.data;
      this.inventoryFormGroup.get('product_variant_id').setValue(variantId)
    })
  }
  Submit($evt){
  let payload = this.inventoryFormGroup.value;
  let date = new Date(payload.date + 'UTC');
  payload.date = date;
  console.log(payload)
  if(this.inventoryFormGroup.valid){
  this.formSubmitted = true;
  this.crudService.submit(payload,'market/inventory',null,$evt,this.inventoryFormGroup)
  }else{
    this.formSubmitted = true;
  }
  }
}
