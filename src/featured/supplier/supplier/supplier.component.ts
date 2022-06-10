
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { RemovingEventArgs, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { BehaviorSubject } from 'rxjs';
import {supplier} from './supplier-control';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { HttpClient } from '@angular/common/http';
import { C, T } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent extends Base implements OnInit , OnDestroy {
  @ViewChild('tab')tab: TabComponent;

  @ViewChild('file')
  uploader:UploaderComponent;
  public areaFields: any = { text: 'text', value: 'value' };
  public fields: any = { text: 'value', value: 'value' };
  formGroup: FormGroup;
  attachmentFormGroup: FormGroup;
  formSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  isEdit = false;
  index: any;
  deletedKeys: any[] = [];
  newKeys: any[] = [];
  deleted_file: any[] = [];
  existingKeys: any[] = [];
  file: any[] = [];
  image_url: any;
  file_url: any;
  public image: any = null;
  selected = false;
  attachmentAdded = false;
  error = false;
  id: any = undefined;
  isUpdate = false;
  attachments: any[] = [];
  public imgFrom: any = null;
  account_id: any;
  category: any[];
  selectedCategory:String = null;
  selectedNode: any;
  placeholder:string = 'select a category';
  disableSupplierInformation:boolean= true;
  public groupField: any = { text: 'text', value: 'value' }
  public categoryFields: Object = {  value: 'id', text: 'category_name', parentValue: 'parent_category_id', hasChildren: 'hasChild'  };
  categoryId: any = null;
  constructor(
    public crudService: CrudOperationService,
    public actRoute: ActivatedRoute,
    private location: Location,
    private httpCancelService:HttpCancelService,
    public httpClient: HttpClient
  ) {
    super(crudService);
    this.createForm();
    this.load_area();
    this.load_region();
    // this.load_parent();
    let payload = {for:'system',project_type:'ecommerce'}
    this.load_group(payload);
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();


  }

  ngOnInit(): void {

    this.id = this.actRoute.snapshot.params.id;
    if (this.id !== undefined) {

      this.isUpdate = true;

      this.service.detail(this.id, 'users/supplier/detail/').subscribe((res: any) => {
        this.account_id = res.data.account.id;
        let files: any[] = [];
        files = res.data.files;
        res.data.account.status = res.data.account.status as boolean; 
        this.formGroup.patchValue(res.data);

        this.load_parents(res.data.product_area_id);
        this.selectedCategory = res.data.category_name;
        this.categoryId = res.data.product_category_id;
        this.formGroup.get('account').patchValue(res.data.account);
        this.formGroup.get('address').patchValue(res.data.address);
    
        files.forEach(element => {
          this.attachments.push({title: element, file: element, showEdit: true});
        });

        //address 
        this.load_city(res.data.address.region_id,res.data.address.city,this.formGroup,'address.city');     
        this.load_sub_city(res.data.address.city_id,res.data.address.sub_city,this.formGroup,'address.sub_city');

        let contactPersonAddress = JSON.parse(res.data.contact_person_address)

        this.formGroup.get('contact_person_address').patchValue(JSON.parse(res.data.contact_person_address));   
        console.log(contactPersonAddress.city)
           //contact_person address
           this.load_city(res.data.contact_region_id, contactPersonAddress.city, this.formGroup, 'contact_person_address.city','contact_person_city','contact_person_city');
           this.load_sub_city(res.data.contact_city_id, contactPersonAddress.sub_city, this.formGroup, 'contact_person_address.sub_city','contact_person_sub_city','contact_person_sub_city');
        this.image = `${environment.baseUrl}uploads/supplier/${res.data.id}/profile.jpeg?time=${new Date()}`;
        this.image_url = `${environment.baseUrl}uploads/supplier/${res.data.id}/profile.jpeg?time=${new Date()}`;
        this.getControl(this.formGroup, 'image').setValue(this.image);
      });
 
    }
  
  }

  // ngAfterViewInit(): void {
  //   window.onload = function() {
  
  //     document.getElementById('browse').onclick = (args) => {
  //       document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
  // };
  // };

  // }
  onUploadButtonClicked(){
    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
  }
  createForm(): void {
    this.formGroup = this.createControls(supplier);

  }
  disableButton(selectedTab){
    switch(selectedTab){
     case "firstTab":
      if(
         this.formGroup.get('company_name').invalid ||
         this.formGroup.get('tin_number').invalid ||
         this.formGroup.get('license_number').invalid ||
         this.formGroup.get('product_category_id').invalid ||
         this.formGroup.get('product_area_id').invalid ||
         this.formGroup.get('account.group_id').invalid ||
         this.image == null
     
      ){
      this.tab.enableTab(1,false);
      this.tab.enableTab(2,false);
      this.tab.enableTab(3,false);
      return true;
     }else {
      this.tab.enableTab(1,true);
       return false;
     }
     case "secondTab":
       if(this.formGroup.get('account').invalid || this.formGroup.get('address').invalid){
        this.tab.enableTab(2,false);
         return true;
       }
       else{
        this.tab.enableTab(2,true);
         return false;
        } 
       case "thirdTab":
        if(this.formGroup.get('contact_person_address').invalid){
          this.tab.enableTab(3,false);
          return true;
        }
        else{
          this.tab.enableTab(3,true);
          return false;
        } 
      }

  }
  onDelete(index, showEdit, title){
    window.confirm('Are you sure you want to delete this Item?');
    if (showEdit){
      this.deleted_file.push(title);
    }
    this.attachments.splice(index, 1);

    }
  onView(file){
   window.open(`${environment.baseUrl}uploads/supplier/${this.account_id}/` + file, '_blank');
  }
  addAttachment() {
    const value = this.formGroup.get('attachmentContent').value;
    value.showEdit = false;

    this.attachments.push(value);
    this.formGroup.get('attachmentContent').reset();
    this.clearFileInput(document.getElementById('file'));
  }

  public onFileRemove(args: RemovingEventArgs): void {
      args.postRawFile = false;
  }

  onTrash(){
    this.selected = false;
    this.id !== undefined ? this.image = this.imgFrom : this.image = null;
  }
  uploading_file(event){
    const file = event.target.files[0];

    const filesize = file.size * 	0.000001;

    if (filesize > 10) {
        this.error = true;

    } else {

      this.error = false;
      this.convert_from_base64(this, file, 'file', false, 'attachmentContent.file');
    }

  }
  nextTab(index){
    this.tab.select(index);
  }
  previousTab(index){
   if (index != 0){
    this.tab.select(1);
   }else{
     this.location.back();
   }
  }
  select(event){
    console.log(event)
  }
  load_parents(id){

    
    this.service.list('catalogue/category/load_parent/'+id).subscribe((res: any) => {
      this.parentCategoryList = res.data;

  

  
    })
  }
  Submit($evt){
  const payload = this.formGroup.value;
  payload.account.status = +payload.account.status;
  delete payload.attachmentContent;
  
  // payload.product_category_id = Array.isArray(payload.product_category_id) ? payload.product_category_id[0] : payload.product_category_id;
  payload.product_category_id = payload.product_category_id.id ?? this.categoryId ;
  payload.image = this.image_url;
  const newFile = this.newFile(); 
  payload.files = {
    id: null, files: newFile.length ? newFile : [{title: '', file: ''}]
  };
  payload.deleted_file = this.deleted_file;
  this.formGroup.get('attachmentContent').disable();
  this.formSubmitted = true;
  payload.contact_person_address = JSON.stringify(payload.contact_person_address);
  console.log(payload)
  if (this.formGroup.valid){
  this.formSubmitted = true;
  this.crudService.submit(payload, 'users/supplier', null, $evt, this.formGroup);
  }else{
    this.formSubmitted = true;
  }
  this.formGroup.get('attachmentContent').enable();
  }

uploadAttachment(){
if (this.newFile().length > 0){
    const payload = {id: this.account_id, files: this.attachments };

    this.crudService.submit(payload, 'users/supplier/upload');

  } else {
    alert('no new file uploaded');
  }

}
newFile(){
  const newAtt: any[] = [];

  this.attachments.forEach(ele => {
    if (!ele.showEdit){ newAtt.push(ele); }
  });

  return newAtt;

}
}
