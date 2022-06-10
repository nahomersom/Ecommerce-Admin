import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Base } from '@core/utils/base';
import { order } from './order-control';
import { environment } from '@environments/environment';
import { T } from '@angular/cdk/keycodes';
import { SecurityService } from '@core/security/security.service';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent extends Base implements OnInit, OnDestroy{
  @ViewChild('tab')tab:TabComponent;
  formGroup: FormGroup;
  orders:any[] = [];
  details:any[] = [];
  deleted:any[] = [];
  product_name:String;
  product_image:any;
  formSubmitted:boolean = false;
  public imgFrom: any = null;
  public fields: any = { text: 'value', value: 'value' };
  public orderFields: any = { text: 'text', value: 'value' };
  public min_order: number;
  variantPrice:any;
  hasVariant: boolean = false;
  noVariantPrice:any;
  variantList:any;
  id=undefined;
  client:string;
  deletedItem:any;
 public categoryFields :Object = {  value: 'id', text: 'category_name', pid:"parent_category_id", hasChildren: 'hasChild'  };
  editCart: boolean = false;
  index: any;
  price_variation: any;
  stockout: any;
  hasStockOut: boolean = false;
  selectedNode: any;
  placeholder:string = 'select a category';
  selectedCategory:String = null;
  product_supplier_name: any;
  clientData: { text: any; value: any; }[];
  allowedForCredit:boolean = false;
  oneTimeCredit:Number;
  totalCredit:Number;
  totalCreditLimit:Number;
  totalPrice: number = 0;
  message: string = null;
  isCredit:boolean = false;
  creditLeft: number;
  constructor(
  private location: Location,public crudService: CrudOperationService,public securityService: SecurityService, public actRoute: ActivatedRoute , public httpCancelService:HttpCancelService,private toastr: ToastrService,
  ) { 
    super(crudService);
    this.createForm();
    this.load_region();
    this.load_payment_method();
    this.load_payment_status();
   
  }
  

  ngOnInit(): void {
    this.load_product_category();
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
   
      this.crudService.detail(this.id,'catalogue/order/detail').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data)
        this.client = res.data.full_name;
        this.clientData = [{text:this.client, value:res.data.client_id}]
        this.selectedCategory = res.data.category_name;
        this.formGroup.get('order_by').patchValue(JSON.parse(res.data.order_by))
        this.formGroup.get('shipping_address').patchValue(res.data.address)
        // this.formGroup.get('detail').patchValue(res.data.detail[0])
        res.data.detail.forEach((element,index) => {
          this.deletedItem = res.data.detail[index].id;
          this.product_image = `${environment.baseUrl}uploads/product/${res.data.detail[index].product_item_id}/thumbnail.jpeg`;
          
          this.details.push({product_name:res.data.detail[index].title,product_image:this.product_image,supplier:res.data.detail[index].supplier})
          this.orders.push(res.data.detail[index])
        });


   
        this.load_city(res.data.address.region_id,res.data.address.city,this.formGroup,'address.city');     
        this.load_sub_city(res.data.address.city_id,res.data.address.sub_city,this.formGroup,'address.sub_city');   
     
      })
      
    }



  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.formGroup = this.createControls(order);

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
  disableButton(selectedTab){
    switch(selectedTab){
      case "firstTab":
        if(!this.orders.length){
          this.tab.enableTab(1,false);
          this.tab.enableTab(2,false);
       
          return true;
        }
        else{
          this.tab.enableTab(1,true);
   
       
          return false;
        }
      case "secondTab":
        if(this.formGroup.get('order_by').invalid
        || this.formGroup.get('payment_status').invalid
        || this.formGroup.get('payment_method').invalid
        || this.formGroup.get('delivery_time').invalid
        || this.formGroup.get('client_id').invalid
        ){
          this.tab.enableTab(2,false);
         return true;
        }
        else{
          this.tab.enableTab(2,true);
    
           return false;
        }
    }
  }
  load_variant(productId){
    this.service.list('catalogue/product/load_variant/'+productId).subscribe((res: any)=>{
      this.variantList = res.data;
      
    })
  }
  onCategorySelect(value){
   this.load_product_by_category(value);
  }
  onProductSelect(value){
    this.product_name = value.text;
    this.product_supplier_name = value.supplier;
    this.product_image = `${environment.baseUrl}uploads/product/${value.value}/thumbnail.jpeg`;
    this.min_order = value.min_order;
    this.crudService.getControl(this.formGroup,'detail.quantity').setValue(this.min_order)
    if(value.has_variant == "0"){
      this.hasVariant = false;
    this.variantPrice = value.price;
   }else{
     this.hasVariant = true;
     this.variantPrice = null;
     this.load_variant(value.value);
   }


  }
  onVariantSelect(value){
    this.variantPrice = value.price;
  }
  onAddToCart(){
   
    if(this.editCart){ 

     this.orders[this.index] = this.crudService.getControl(this.formGroup,'detail').value;
     this.details[this.index] = {product_name:this.product_name,product_image:this.product_image};
  
    }else{
    this.orders.push(this.crudService.getControl(this.formGroup,'detail').value);
    console.log(this.orders)

    this.details.push({product_name:this.product_name,product_image:this.product_image,supplier:this.product_supplier_name})
    }
 
    this.product_supplier_name = undefined;
    this.crudService.getControl(this.formGroup,'detail').reset();
    this.crudService.getControl(this.formGroup,'product_detail').reset();
    this.hasVariant = false;
    this.editCart = false;
  }
  onEdit(index){
  this.editCart = true;
  console.log(this.orders[index])
  this.crudService.getControl(this.formGroup,'detail').patchValue(this.orders[index])
  this.crudService.getControl(this.formGroup,'product_detail').patchValue(this.orders[index])
  this.index = index;
  }
  onDelete(index){
   if(confirm('Are you sure you want to delete this item?')){
     if(this.id !== undefined){

        this.deleted.push(this.deletedItem)
     }
     this.orders.splice(index, 1)
   }
  }
  onCreditChecked(value){
    value ? this.isCredit = true : this.isCredit = false;
  }
  load_payment_method(actual_value = null){
    let payload = { lookup_type: 'payment_method'};
    let control:any = this.formGroup.get('payment_method');
  
    this.load_lookup(payload,null,control,actual_value);
  }
  load_payment_status(actual_value = null){
    let payload = { lookup_type: 'payment_status'};
    let control:any = this.formGroup.get('payment_status');
  
    this.load_lookup(payload,null,control,actual_value);
  }
  onClientSelected(value){
     this.client = value.text;
     value.allow_credit_facility == 1 ? this.allowedForCredit = true : this.allowedForCredit = false;  
     this.clientData = [value];
     this.oneTimeCredit = value.one_time_credit_limit;
     this.totalCreditLimit = value.total_credit_limit;
     this.totalCredit = value.total_credit;
     this.creditLeft = +this.totalCreditLimit - +this.totalCredit;
  }
  load_product_category(){
    this.service.list('catalogue/category/load_parent/').subscribe((res: any) => {
      this.parentCategoryList = res.data;
  
    })

  }
  Submit($evt){
  this.crudService.sending = true;
  let payload = this.formGroup.value;
  payload.is_credit = +payload.is_credit;
  delete payload.product_detail
  delete payload.detail
  payload.deleted = this.deleted;
  this.orders.forEach(element => {
    delete element.category;
    delete element.title
    delete element.category_name;
    delete element.supplier; 
    this.totalPrice = this.totalPrice + +element.unit_price;
  });
  if(this.isCredit){
     if(this.oneTimeCredit < this.totalPrice){
    this.message = `The total price of the product exceed your one time credit limit. you only have ${Math.max(0, this.creditLeft)} credit`;
    this.tab.select(0);
    this.crudService.sending = false;
     }
    else if(this.totalCreditLimit < this.totalPrice){
      this.message = `The total price of the product exceed your credit limit. you only have ${Math.max(0, this.creditLeft)} credit`;
      this.tab.select(0);
      this.crudService.sending = false;
   }
  }
  else {
    this.message = null
  } 

  payload.detail = this.orders;
  payload.payment_status = +payload.payment_status;
  delete Object.assign(payload, {["address"]: payload["shipping_address"] })["shipping_address"];
  this.formGroup.get('product_detail').disable();
  this.formGroup.get('detail').disable();
   if(this.formGroup.valid && this.message == null){
    this.formSubmitted = true;

    this.crudService.post(payload,'catalogue/order').subscribe((res:any)=>{

      if(res.status && res.data){
        if(('stockout' in res.data) || ('price_variation' in res.data)){
     
          this.toastr.warning(res.message,'Warning');
          this.hasStockOut = true;
          this.stockout = res.data.stockout;
          this.price_variation = res.data.price_variation; 
          this.tab.select(0);
         }
   
      }else if(res.status){
        this.toastr.success(res.message,'Success');
        $evt ? this.formGroup.reset() : this.location.back();
      }
      else {
        this.toastr.error(res.message, 'Error');
      }
   
      this.crudService.sending = false;
    }
    )
  }
  else{

    this.formSubmitted = true;
  }
   this.formGroup.get('product_detail').enable();
   this.formGroup.get('detail').enable();
  }



}