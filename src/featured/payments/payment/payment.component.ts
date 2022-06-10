import { T } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { environment } from '@environments/environment';
import { RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';
import {payment} from './payment-control'

@Component({
  selector: 'app-payments',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent extends Base implements OnInit , OnDestroy{
  dateValue = new Date();
  selected:boolean = false;
  formGroup: FormGroup;
  attachment:any;
  attachment_url:any;
  formSubmitted: boolean = false;
  isSelected:boolean = false;
  id:any = undefined;
  public imgFrom: any = null;
  isUpdate:boolean = false;
  paymentFileds:any 
  image_url:any;
  orderNumber:any;
  public fields: any = { text: 'value', value: 'value' };
  public orderFields: any = { text: 'text', value: 'value' };
  public orderData:any;
  public paidFor:Array<Object> = [{text:'Order',value:'order'},{text:'Service',value:'service'}];
  supplier_id: string;
  hasFile: boolean = false;
  isForOrder: boolean = undefined;
  payedForSelected: boolean = false;
  constructor(public httpCancelService:HttpCancelService ,public crudService:CrudOperationService,public actRoute: ActivatedRoute,private securityService: SecurityService) {
    super(crudService);
    this.createForm();
    this.load_payment_method();
   }

  ngOnInit(): void {
    this.crudService.getControl(this.formGroup,'order_id').disable();
    this.crudService.getControl(this.formGroup,'contract_id').disable();
    if(this.securityService.securityObject.is_supplier){
 
      this.supplier_id = this.securityService.securityObject.id;
     
      }
    this.id = this.actRoute.snapshot.params.id;
    if(this.id !== undefined){
      this.crudService.detail(this.id,'accounting/payment/detail/').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data);
        this.onPaidForSelected(res.data.paid_for)
         if(res.data.order.length){
          this.crudService.getControl(this.formGroup,'order_id').enable();
          this.orderNumber = '#'+res.data.order[0]?.order_number;
          this.orderData = [{text:this.orderNumber, value:this.orderNumber}]
         }

        this.hasFile = res.data.has_file as boolean;
      })
      this.image_url = `${environment.baseUrl}uploads/payment/${this.id}`;
      this.formGroup.get('image').patchValue(this.image_url)
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  
  }
  createForm(): void {
    this.formGroup = this.createControls(payment);
  }
  onOpenPdf(){
    window.open(this.image_url)
    this.isUpdate = true;
  }
  fileSelected(){
    this.isSelected = true;
   }
  public onFileRemove(args: RemovingEventArgs): void {
      args.postRawFile = false;
      this.formGroup.get('image').reset();
  }
  load_payment_method(actual_value = null){
    let payload = { lookup_type: 'payment_method'};
    let control:any = this.formGroup.get('payment_method');
  
    this.load_lookup(payload,null,control,actual_value);
  }

  onPaidForSelected(item){
    this.payedForSelected = true;
    if(item == "service"){
      this.isForOrder = false;
      this.crudService.getControl(this.formGroup,'order_id').setValue(null);
      this.crudService.getControl(this.formGroup,'order_id').disable();
      this.crudService.getControl(this.formGroup,'supplier').enable();
      this.crudService.getControl(this.formGroup,'client').disable();
    }else{
      this.isForOrder = true;
      this.crudService.getControl(this.formGroup,'supplier').setValue(null);
      this.crudService.getControl(this.formGroup,'client').setValue(null);
      this.crudService.getControl(this.formGroup,'contract_id').setValue(null);
      this.crudService.getControl(this.formGroup,'supplier').disable();
      this.crudService.getControl(this.formGroup,'client').enable();
      this.crudService.getControl(this.formGroup,'contract_id').disable();
      this.crudService.getControl(this.formGroup,'order_id').enable();
     
    }
  }
  search_supplier(e){
    this.crudService.post({ keyword: e.text , product_category_id:this.categoryId , limit: 10}, 'users/supplier/load_supplier').subscribe((res: any) => {
      e.updateData(res.data);

    });
  }
  onSupplierSelected(supplierId){
   this.load_contract(supplierId);
   this.crudService.getControl(this.formGroup,'contract_id').enable();
  }
  Submit($evt){
  let payload = this.formGroup.getRawValue();
  payload.image = this.image_url;
  let date = new Date(payload.date);
  payload.date = date;
  if(this.isForOrder){
    payload.user_id = payload.client;
    delete payload.client;
    delete payload.supplier; 
  }else{
    payload.user_id = payload.supplier;
    delete payload.client;
    delete payload.supplier;
  }
  payload.user_id = this.supplier_id;
  if(this.formGroup.valid && payload.image){

    this.formSubmitted = true;
    this.crudService.submit(payload,'accounting/payment',null,$evt,this.formGroup);
    
  } else {
    this.formSubmitted = true;

  }
  
}
}