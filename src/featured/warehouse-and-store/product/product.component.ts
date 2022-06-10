import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {product} from './product-control'
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Location } from '@angular/common';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownTreeComponent, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SecurityService } from '@core/security/security.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { C } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends Base implements OnInit , OnDestroy{
  @ViewChild('tab')
  tab:TabComponent;

  @ViewChild('dropdownbtn')
  private ddb: DropDownButtonComponent;

  @ViewChild('variants')
  private vt: MultiSelectComponent;

  @ViewChild('ms')
  ms: MultiSelectComponent

  @ViewChild('file')
  uploader:UploaderComponent;

  @ViewChild('ddt')
  ddt: DropDownTreeComponent;

  
  deleted_image:any[] = [];
  deleted:any[] = [];
  imageArray:any[] =[];
  thumbnail:any;
  thumbnail_url:any[]=[];
  imageArrayUrl:any[] = [];
  selected:boolean = false;
  removable = true;
  addOnBlur = true;
  selectable = true;
  id:any = undefined;
  isUpdate:boolean = false;
  productImage:any[]=[];
  index:any;
files:any[]=[];
  isAttributeEdit:boolean = false;
  isVariantEdit:boolean = false;
  attributeArray:any[] =[];
  variantsArray:any[] =[];
  variantsTextArray:any[] =[];
  formGroup:FormGroup;
  formSubmitted:boolean = false;
  imageObject:any;
  public imgFrom: any = null;
  public fields: any = { text: 'value', value: 'value' };
  public productFields: any = { text: 'text', value: 'value' };
  placeholder:string = 'select a category';
  attributeValues:any[] = [];
  attributeAdded:boolean = false;
  disabled:boolean = false;
  public categoryFields :Object = {    };
  currentIndex: any = -1;
  showFlag: any = false;
  variant: boolean = true;
  disableProductVariant:boolean;
  mode: string;
  public variants:any[] = [];
  variantsLists: any;
  selectedNode: any;
  selectedCategory:String = null;
  public variantCombinationText:any[] = [];
  public variantCombinationIds:any[] = [];
  categoryId: any = null;
  public value:any ["61c33da93f232270124046"];

  constructor(
    public crudService: CrudOperationService,
    private location: Location,
    private securityService: SecurityService, 
    private actRoute: ActivatedRoute, 
    public httpCancelService:HttpCancelService
    ) { 
    super(crudService);
    this.createForm();
    this.load_variants();
    this.load_product_attribute();
    this.load_measurement_unit();
    this.load_color();
  }

  ngOnInit(): void {

   this.mode = 'CheckBox';
   this.formGroup.get('price').disable();
   this.id = this.actRoute.snapshot.params.id;
   this.load_product_category();

   if(this.id !== undefined) {

     this.isUpdate = true;

     this.service.detail(this.id,'catalogue/product/detail/').subscribe((res: any) => {
       //  this.account_id = res.data.account_id;
       this.formGroup.patchValue(res.data);
       this.selectedCategory = res.data.category_name;
      this.formGroup.get('has_variant').setValue(res.data.has_variant == '1' ? true : false)
      this.variant = res.data.has_variant == '1' ? true : false;
      this.disableProductVariant = res.data.has_variant == '1' ? false : true;
      this.formGroup.get('status').setValue(res.data.status == "1" ? true : false)
      this.variant ? this.formGroup.get('price').disable() : this.formGroup.get('price').enable();
      this.formGroup.get('accept_stockout_order').setValue(res.data.accept_stockout_order == "1" ? true : false)
      this.categoryId = res.data.product_category_id;

        let attributes:any[] = [];
        let variantsText:any[] = [];
        let variant:any[] = [];
       
        attributes = JSON.parse(res.data.attributes);

        variantsText = res.data.detail;
        variant = res.data.detail;
        // res.data.has_variant === 1 ? this.variant = true : !this.variant;
        attributes.forEach(element => {
     
          this.attributeArray.push(element)
     
        });  
        variantsText.forEach(element => {
       
          this.variantsTextArray.push(JSON.parse(element.product_variants_text))
         
          }); 
          variant.forEach(element => {
         
         this.variantsArray.push(element)
        
         }); 

      // this.image = `${environment.baseUrl}uploads/supplier/${res.data.account_id}/profile.jpeg`;
      Object.values(res.data.images).forEach((val,index)=>{
        
        let url = `${environment.baseUrl}uploads/product/${this.id}/${val}`;
          this.imageArray[index]= url;
          this.imageArrayUrl[index] = url;
          this.files[index] = val;
      } );
      this.thumbnail = `${environment.baseUrl}uploads/product/${res.data.id}/thumbnail.jpeg`;
      this.thumbnail_url = [`${environment.baseUrl}uploads/product/${res.data.id}/thumbnail.jpeg`];
      this.thumbnail_url = this.thumbnail_url[0]

      this.getControl(this.formGroup,'thumbnail').setValue(this.thumbnail);
       
      this.getControl(this.formGroup,'image').setValue(this.imageArray);
       
    });

   }   


  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  load_product_category(){
    this.service.list('catalogue/category/load_parent/').subscribe((res: any) => {
      this.parentCategoryList = res.data;

  

  
    })

  }

  createForm(): void {
    this.formGroup = this.createControls(product);
  }
  onTrash(i=null,imageId=null){

    if(i!=null){
      if(this.isUpdate){
        this.deleted_image.push(this.files[i])
        this.imageArray.splice(i, 1);
        this.imageArrayUrl.splice(i, 1);
        this.files.splice(i, 1);
        
      } else {
        this.imageArray.splice(i, 1);
        this.imageArrayUrl.splice(i, 1);
        if(!this.imageArray.length){

          this.formGroup.get('image').setValue(null);
        }
     
         

      }

    }
    else{
     this.thumbnail = null;
     this.formGroup.get('thumbnail').setValue(null);
     if(this.isUpdate){
      this.deleted_image.push("thumbnail.jpeg")
    }
    }
  }
  disableButton(){
  if(this.formGroup.get('title').invalid
  || this.formGroup.get('product_category_id').invalid 
  || this.formGroup.get('min_order').invalid
  || this.formGroup.get('measurment_unit').invalid
  || this.formGroup.get('model').invalid
  || this.formGroup.get('brand').invalid
 // || !this.variantsArray.length
  || !this.attributeArray.length
  ){
    this.tab.enableTab(1,false);
    return true;
  }
  else {
    this.tab.enableTab(1,true);
    return false;
  }
  }
addAttribute(formGroupName) {
  let FG = this.crudService.getControl(this.formGroup,formGroupName);
  let payload = this.crudService.getControl(this.formGroup,formGroupName).value;
  
  if(formGroupName == 'attributes'){
    this.attributeArray.push(FG.value) 

  }else{
   payload.product_variants = JSON.stringify(this.variantCombinationIds);
   payload.product_variants_text = JSON.stringify(this.variantCombinationText);

   delete payload.variant;

   this.variantsArray.push(payload);
   this.variantsTextArray.push(this.variantCombinationText);
   
  } 

  FG.reset();
  this.variants = []
  this.variantCombinationText = []
  this.variantCombinationIds = [];

}
load_variants(){
  this.service.list('variant/item/load_variant').subscribe((res: any) => {
    this.variantsLists = res.data;
  
  });
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
onDelete(index,arrayName,formGroupName=null){
  let x = this.crudService.getControl(this.formGroup,formGroupName);
  if(confirm("Are you sure you want to delete this Item?")){
    switch(arrayName){
      case 'variant':
        this.deleted.push(this.variantsArray[index].id);
        this.variantsArray.splice(index, 1);
        this.variantsTextArray.splice(index, 1);
         
        break;
      case 'attributes':
        this.attributeArray.splice(index, 1);
        break;
      default:
        return false;
    }

    
    x.reset();
    this.isAttributeEdit = false;
    this.isVariantEdit = false;
    this.disabled = false;
  }else{
    return false;
  }
 }  
                                                        
 onUpdate(index,formGroupName,arrayName){
  formGroupName == 'attributes'? this.isAttributeEdit = true : this.isVariantEdit = true;
  if(arrayName == 'attributeArray'){
    this.crudService.getControl(this.formGroup,formGroupName).patchValue(this.attributeArray[index])
  }
    else{
      let value = this.variantsArray[index];

      value.variant = JSON.parse(value.product_variants);

      this.variantCombinationText = JSON.parse(value.product_variants_text);
      this.variantCombinationIds = JSON.parse(value.product_variants);

      this.variantCombinationText.forEach(ele => {
        this.variants.push(Object.keys(ele)[0]) 
      });


      this.crudService.getControl(this.formGroup,formGroupName).patchValue(value);

    }

  this.index = index;
} 
update(formGroupName){

  let FG= this.crudService.getControl(this.formGroup,formGroupName);
  let payload= this.crudService.getControl(this.formGroup,formGroupName).value;

  if(formGroupName == 'attributes') {
    this.attributeArray[this.index] = payload;

  } else {
    payload.product_variants = JSON.stringify(this.variantCombinationIds);
    payload.product_variants_text = JSON.stringify(this.variantCombinationText);
 
    delete payload.variant;
   
    this.variantsArray[this.index] = payload;

    this.variantsTextArray.push(this.variantCombinationText);

    FG.reset();
    this.variants = []
    this.variantCombinationText = []
    this.variantCombinationIds = [];

  }
  
  this.isAttributeEdit = this.isVariantEdit = false;
  
}

showLightbox(index,image) {
this.imageObject = [{image:image,thumbImage:image}]
  this.currentIndex = index;
  this.showFlag = true;

}
closeEventHandler() {
  this.showFlag = false;
  this.currentIndex = -1;
}

load_measurement_unit(){
  let payload = { lookup_type: 'measurement_unit'};

  this.load_lookup(payload);
}
load_color(){
  let payload = { lookup_type: 'color'};

  this.load_lookup(payload);
}
load_product_attribute(){
  let payload = { lookup_type: 'product_attributes'};
 

  this.load_lookup(payload);
}


public onOpen(args: any): void {
  args.element.parentElement.querySelector('.e-cancel').addEventListener('click', this.closePopup.bind(this));
}

public onClose(args: any): void {
  args.element.parentElement.querySelector('.e-cancel').removeEventListener('click', this.closePopup.bind(this));
}

public closePopup(): void {
  this.ddb.toggle();
}
hasVariant(){
  this.disableProductVariant = !this.disableProductVariant;
   console.log('here we go:'+this.disableProductVariant)
  this.variant = !this.variant;
  console.log(this.variant)
  if(this.variant){
    this.formGroup.get('price').setValue(null);
    this.formGroup.get('price').disable();
    this.formGroup.get('price').clearValidators();
    this.formGroup.get('detail').enable();
    this.formGroup.get('detail').setValidators([Validators.required])
    this.isAttributeEdit = false;
    this.formGroup.get('attributes').reset();
  
  }else{

    
    this.formGroup.get('price').enable();
    this.formGroup.get('price').setValidators([Validators.required]);
    this.formGroup.get('detail').reset();
    this.formGroup.get('detail').clearValidators();
    this.isVariantEdit = false;
    this.formGroup.get('detail').disable();
    // this.variantCombinationText = []
    this.variantsArray = [];
  }
}

onSelect(value,ag:any){
  let variant = value.itemData?.variant;
  let text = value.itemData?.text;
 
  let obj = {[variant] : text}

  if(!this.variants.includes(variant)){

    this.variants.push(variant);

    this.variantCombinationIds.push(value.itemData?.value);
    console.log(this.variantCombinationText)
    this.variantCombinationText.push(obj);

  } else {
    
    let index = this.variantCombinationText.findIndex(ele => ele[variant] !== undefined);
    this.variantCombinationText[index] = obj;

  }


}

onCustomValueSelection($event){
  console.log($event)
}
onCloseVariant(value){
  this.variantList = [];
  if(this.vt.value.length){
    
    this.load_variant_option(this.vt.value);
  }
  
}
onRemoved(value){
  let index = this.variants.indexOf(value);
  this.variants.splice(index,1);

}
Submit($evt){
 let payload = this.formGroup.value;  
 payload.image = this.imageArrayUrl;
 payload.thumbnail = this.thumbnail_url;
 payload.attributes = JSON.stringify(this.attributeArray);
 payload.detail = this.variantsArray;
 payload.deleted_image = this.deleted_image;
 payload.deleted = this.deleted;
 payload.has_variant = payload.has_variant  ? 1 : 0;
 payload.accept_stockout_order = payload.accept_stockout_order  ? 1 : 0;
 payload.status = payload.status ? 1 : 0; 
 payload.product_category_id = payload.product_category_id.id ?? this.categoryId ;
 if(this.securityService.securityObject.is_supplier){
 
  payload.supplier_id = this.securityService.securityObject.id;
 
  }
this.formGroup.get('detail').disable();
this.formGroup.get('attributes').disable();
 if(this.formGroup.valid){
   console.log(this.formGroup.value)
   this.formSubmitted = true;
   this.crudService.submit(payload,'catalogue/product',null,$evt,this.formGroup);
 }
 else{
   this.formSubmitted = true;
 }
 this.formGroup.get('detail').enable();
this.formGroup.get('attributes').enable();
}

}

