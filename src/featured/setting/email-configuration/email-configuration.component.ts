import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {email} from './email-control';
import { Location } from '@angular/common';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { T } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-email-configuration',
  templateUrl: './email-configuration.component.html',
  styleUrls: ['./email-configuration.component.css']
})
export class EmailConfigurationComponent extends Base implements OnInit , OnDestroy{
  @ViewChild('tab')tab: TabComponent;
  formGroup: FormGroup;
  isEdit = false;
  index: any;
  formSubmitted = false;
  deletedKeys: any[] = [];
  newKeys: any[] = [];
  existingKeys: any[] = [];
  public tools: object = {
    type: 'Expand',
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
  'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
  'LowerCase', 'UpperCase', '|',
  'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
  'Outdent', 'Indent', '|',
  'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
  'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
  };
  constructor(public crudService: CrudOperationService, public location: Location,public httpCancelService: HttpCancelService) {
    super(crudService);
    this.createForm();
  }

  ngOnInit(): void {
    this.crudService.list('util/setting').subscribe((res: any) => {
 
      this.formGroup.patchValue(res.data)
      this.formGroup.get('accept_stockout_order').setValue(res.data.accept_stockout_order === "1" ? true : false);

      console.log(this.formGroup.value)
      this.formGroup.get('email_config').patchValue(JSON.parse(res.data.email_config));
      this.formGroup.get('id').setValue(res.data.id);

      res.data.keys.forEach(ele => {
        this.add(ele);
      });

    });
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
   this.formGroup = this.createControls(email);
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
  public GA(): FormArray {
    return this.formGroup.get('lang_keys') as FormArray;
  }

  public GG(index): FormGroup {
    return this.GA().controls[index] as FormGroup;
  }

  public add(data){
    this.GA().push(
      new FormGroup({
        id: new FormControl(data.id),
        key: new FormControl(data.key, Validators.required),
      })
    );
  }

  onKeyEnter($event){
    if ($event.key === 'Enter' && this.formGroup.get('key').valid){
      if (this.isEdit){
        this.update(this.formGroup.get('key').value);

      } else {
        this.add({ id: null, key: this.formGroup.get('key').value });
        this.formGroup.get('key').reset();
      }

    }

  }
  public edit(index){
    this.isEdit = true;
    this.index = index;
    this.formGroup.get('key').setValue(this.GG(index).get('key').value);
  }

  public update(value){
    this.isEdit = false;
    this.GG(this.index).get('key').setValue(value);
    this.formGroup.get('key').reset();
  }

  public remove(index, id){
    if (confirm('are you sure want to remove this ?')) {
      this.deletedKeys.push(id);
      this.GA().removeAt(index);
    }
  }
  disableButton(selectedTab){
    // switch(selectedTab){
    //  case "firstTab":
    //   if(this.formGroup.get('email_config').invalid){
    //   this.tab.enableTab(1,false);
      
    //   return true;
    //  }else {
    //   this.tab.enableTab(1,true);

    //    return false;
    //  }
    //  case "secondTab":
    //   if(this.formGroup.get('about_us').invalid
    //   || this.formGroup.get('contact_us').invalid 
    //   || this.formGroup.get('privacy_policy').invalid
    //   || this.formGroup.get('term_condition').invalid
    //   || this.formGroup.get('tax').invalid
    //   || this.formGroup.get('max_cart_deadline').invalid
    //   || this.formGroup.get('accept_stockout_order').invalid
     
    //   ){
    //     this.tab.enableTab(2,false);
    //      return true;
    //    }
    //    else{
    //     this.tab.enableTab(2,true);
    //     return false;
    //     }
    //   case "thirdTab":
    //     if(this.GA.length){
    //       this.tab.enableTab(3,false);
    //        return true;
    //      }
    //      else{
    //       this.tab.enableTab(3,true);
    //       return false;
    //       }
    //   }
  }
  Submit($evt){

    this.GA().value.forEach((ele) => {
      ele.id === null ? this.newKeys.push(ele) : this.existingKeys.push(ele);      
    });
    const payload = this.formGroup.value;
    let lang_keys = { new: this.newKeys, existing: this.existingKeys, deleted:this.deletedKeys };

    payload.email_config = JSON.stringify(payload.email_config);
    payload.accept_stockout_order = payload.accept_stockout_order  ? 1 : 0;
    payload.lang_keys = lang_keys;

    delete payload.key;

    if (this.formGroup.valid){
      payload.max_credit_payment_date = new Date(payload.max_credit_payment_date + 'UTC')
      this.formSubmitted = true;
      this.crudService.submit(payload, 'util/setting', null, $evt, this.formGroup);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
