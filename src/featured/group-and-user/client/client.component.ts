import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RemovingEventArgs, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { BehaviorSubject } from 'rxjs';
import {Base} from '@core/utils/base';
import { FormGroup } from '@angular/forms';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {client} from './client-control'
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Location } from '@angular/common';
import { environment } from '@environments/environment';
import { T } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent extends Base implements OnInit , OnDestroy {
  @ViewChild('tab')tab:TabComponent;
  @ViewChild('file')
  uploader:UploaderComponent;
  @ViewChild('interestedArea')interestedArea:MultiSelectComponent;
  public fields: any = { text: 'value', value: 'value' };
  public areaFields: any = { text: 'text', value: 'value' };
  formSubmitted = false; 
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  isEdit: boolean = false;
  index: any;
  error:boolean = false;
  deletedKeys:any[] = [];
  newKeys:any[] = [];
  existingKeys:any[] = [];
  attachments:any[] = [];
  deleted_file:any[] = [];
  isUpdate:boolean = false;
  account_id: any;
  image_url: any;
  public image: any = null;
  id:any = undefined;
  formGroup:FormGroup;
  selected:boolean = false;
  public imgFrom: any = null;
  public hasCreditFacility:boolean = false;
  constructor(
    public crudService:CrudOperationService,
    public actRoute: ActivatedRoute,
    private location: Location,
    public httpCancelService: HttpCancelService
  ) { 
    super(crudService);   
    this.createForm();
    this.load_payment_option();
    this.load_area();
    this.load_region();
    this.load_credit_status();
  }
  

  ngOnInit(): void {
    this.onCreditFacilityChecked(false);

    this.id = this.actRoute.snapshot.params.id;
    if(this.id !== undefined) {

      this.isUpdate = true;

      this.service.detail(this.id,'users/client/detail').subscribe((res: any) => {

        res.data.interested_area = JSON.parse(res.data.interested_area)
        this.load_area(res.data.interested_area,this.formGroup)

      
         this.account_id = res.data.account.id;
         this.formGroup.patchValue(res.data);
        
         this.formGroup.get('account').patchValue(res.data.account)
         this.formGroup.get('address').patchValue(res.data.address)

         this.load_city(res.data.address.region_id,res.data.address.city,this.formGroup,'address.city');     
         this.load_sub_city(res.data.address.city_id,res.data.address.sub_city,this.formGroup,'address.sub_city');   

         res.data.files.forEach(element => {
          this.attachments.push({title:element,file:element,showEdit: true})
         });
      
        this.image = `${environment.baseUrl}uploads/client/${res.data.account.id}/profile.jpeg`;
        this.image_url = `${environment.baseUrl}uploads/client/${res.data.account.id}/profile.jpeg`;
        this.getControl(this.formGroup,'image').setValue(this.image);

      });

    }


  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  
  }
  // ngAfterViewInit(): void {
  //   window.onload = function () {
  //     document.getElementById('browse').onclick = (args) => {
  //       document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
  // };
  // }

  // }
  onUploadButtonClicked(){
    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
  }
  createForm(): void {
    this.formGroup = this.createControls(client);
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
      if(this.formGroup.get('credit_status').invalid
      || this.formGroup.get('payment_option').invalid 
      || this.formGroup.get('total_credit_limit').invalid
      || this.formGroup.get('one_time_credit_limit').invalid
      || this.formGroup.get('credit_status').invalid
      || this.formGroup.get('interested_area').invalid
      || this.formGroup.get('tin_number').invalid
      || this.formGroup.get('image').invalid
      || this.formGroup.get('account.full_name').invalid
     
      ){
      this.tab.enableTab(1,false);
      this.tab.enableTab(2,false);
      this.tab.enableTab(3,false);
      return true;
     }else {
       this.tab.enableTab(1,true)
       return false;
     }
     case "secondTab":
       if(this.formGroup.get('address').invalid){
        this.tab.enableTab(2,false);
         return true;
       }
       else{
        this.tab.enableTab(2,true);  
        return false;
      } 
       case "thirdTab":
        if(this.formGroup.get('attachment').invalid){
          this.tab.enableTab(3,false);
          return true;
        }
        else{
          this.tab.enableTab(3,true);
          return false;
        } 
      }

  }

  onDelete(index,showEdit,title){
    window.confirm("Are you sure you want to delete this Item?");
    if(showEdit){
      this.deleted_file.push(title)
    }
    this.attachments.splice(index,1);

    }                                                                                               
  onView(file){
   window.open(`${environment.baseUrl}uploads/client/${this.account_id}/`+ file,"_blank")
  }
  addAttachment() {
    let value = this.formGroup.get('attachment').value;
    value.showEdit = false;

    this.attachments.push(value)    
    this.formGroup.get('attachment').reset();
    this.clearFileInput(document.getElementById("file"));

  }
  uploadAttachment(){
    if(this.newFile().length > 0){
        let payload = {id: this.account_id,files:this.attachments }
       
        this.crudService.submit(payload,'users/supplier/upload');
    
      } else {
        alert("no new file uploded");
      }
    
    }
  uploading_file(event){
    let file = event.target.files[0];

    let filesize = file.size * 	0.000001;

      if (filesize > 10) {
        this.error = true;

    } else {

      this.error = false;
      this.convert_from_base64(this,file,'file', false,'attachment.file')
    }

  }
  newFile(){
    let newAtt:any[] = []; 
  
    this.attachments.forEach(ele => {
      if(!ele.showEdit){ newAtt.push(ele); }
    });
    
    return newAtt;  
  
  }
  public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;



  public onFileRemove(args: RemovingEventArgs): void {
      args.postRawFile = false;
  }


  onTrash(){
    this.selected = false;
    this.image = this.imgFrom;
    this.image_url = this.image;
  }
  load_credit_status(){
    let payload = { lookup_type: 'credit_status'};
  
    this.load_lookup(payload);
  }
  load_payment_option() {
    const payload = { lookup_type: 'payment_option' };
    this.load_lookup(payload);
  
  }
  onCreditFacilityChecked(checked){
    if(!checked){
      this.hasCreditFacility = false;
      this.formGroup.get('total_credit_limit').disable();
      this.formGroup.get('one_time_credit_limit').disable();
      this.formGroup.get('credit_status').disable();
      this.formGroup.get('total_credit_limit').setValue(null);
      this.formGroup.get('one_time_credit_limit').setValue(null);
      this.formGroup.get('credit_status').setValue(null);
    }else{
      this.hasCreditFacility = true;
      this.formGroup.get('total_credit_limit').enable();
      this.formGroup.get('one_time_credit_limit').enable();
      this.formGroup.get('credit_status').enable();
    }
  }
  Submit($evt){
    let payload = this.formGroup.value;
    
    delete payload.attachment;
    payload.image = this.image_url;
    payload.interested_area_text = this.interestedArea.text;
    let newFile = this.newFile();
      payload.files = {
      id: null,files:newFile.length ? newFile : [{title:"",file:""}]
    }
    payload.deleted_file = this.deleted_file
    this.formGroup.get('attachment').disable();
     console.log(this.interestedArea.text)
    
    
    if(this.formGroup.valid){
    payload.interested_area = JSON.stringify(this.formGroup.get('interested_area').value);
    this.formSubmitted = true;
    this.crudService.submit(payload,'users/client',null,$evt,this.formGroup);
    }else{
      this.formSubmitted = true;
    }
    this.formGroup.get('attachment').enable();
    }


}