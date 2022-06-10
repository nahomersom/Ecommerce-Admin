import { C, T } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { environment } from '@environments/environment';
import { DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import {categories} from 'featured/catalogue/categories/categories-control';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent extends Base implements OnInit , OnDestroy {
  @ViewChild('file')
  uploader:UploaderComponent;

  @ViewChild('parent')
  parent_category:DropDownTreeComponent;
  
  public image: any = null;
  selected:boolean = false;
  formGroup: FormGroup;
  formSubmitted:boolean = false;
  id:any = undefined;
  isParent:boolean = false;
  public image_url:any;
  public imgFrom: any = null;
  public fields: any = { text: 'text', value: 'value' };
  categoryType:any = [{text:'Main',value:'main'},{text:'Child',value:'child'},{text:'Sub',value:'sub'}]
  public categoryFields :Object = {  value: 'value', text: 'text' };
  parentId: any;
  enableParentCategory: boolean = true;
  constructor(public crudService: CrudOperationService,public actRoute: ActivatedRoute , public httpCancelService:HttpCancelService) { 
  super(crudService);
  this.createForm();
  
  this.load_area();
  // this.load_parent();

  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  
  }
  ngOnInit(): void {


    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'catalogue/category/detail/').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data)
        this.formGroup.get('accept_stockout_order').setValue(res.data.accept_stockout_order == "1" ? true : false)
        this.load_parents(res.data.area_id);
      })
      this.image = `${environment.baseUrl}uploads/product/category/${this.id}`;
      this.image_url = `${environment.baseUrl}uploads/product/category/${this.id}`;
    }
  }

  ngAfterViewInit(): void {
    document.getElementById('browse').onclick = (args) => {
      document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    };
  }



  createForm(): void {
  this.formGroup = this.createControls(categories);
  }
  onTrash(){
    this.selected = false;
    this.image = this.imgFrom;
    this.image_url = this.image;
  }
load_parents(id = null){
  this.parentCategoryList = [];

  let type = this.formGroup.get("type").value;
  if(type == 'child'){
    type = 'sub';

  }else if(type == 'sub'){
    type = 'main';
  }

  if(this.formGroup.get("type").value !== "main"){

    let payload = { area_id: id ?? this.formGroup.get('area_id').value, type: type };
    
    this.service.post(payload,'catalogue/category/load_category').subscribe((res: any) =>{
  
      this.parentCategoryList = res.data;

  

  
    })

  }



}

onCategoryTypeSelect(value){
 if(value == 'main'){
   this.enableParentCategory = false;
 }
 else{
  this.enableParentCategory = true;
 }
}


 Submit($evt){
  let payload = this.formGroup.getRawValue();
  payload.image = this.image_url;
  payload.accept_stockout_order = payload.accept_stockout_order  ? 1 : 0;
  this.formGroup.get('image').setValue(payload.image)

  if(this.formGroup.valid && payload.image){
    
    this.formSubmitted = true;
    this.crudService.submit(payload,'catalogue/category',null,$evt,this.formGroup);
    
    
  } else {
    this.formSubmitted = true;

  }
}
}
