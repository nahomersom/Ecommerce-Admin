import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import {content} from './content-control';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { T } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent extends Base implements OnInit , OnDestroy{
  constructor(
    public httpCancelService: HttpCancelService,
    private location: Location, public crudService: CrudOperationService, public actRoute: ActivatedRoute) {
    super(crudService);
    this.createForm();
  }
  @ViewChild('tab')tab: TabComponent;
  @ViewChild('file')
  uploader:UploaderComponent;
  public image: any = null;
  selected = false;
  public carousel: boolean;
  imageArray: any[] = [];
  imageArrayUrl: any[] = [];
  currentIndex: any = -1;
  showFlag: any = false;
  imageObject: any;
  formGroup: FormGroup;
  id: any = undefined;
  formSubmitted = false;
  public imgFrom: any = null;
  public contentFields = {value: 'contentType', text: 'id'};
  public imageFields = {value: 'imageType', text: 'imageType'};
  public contentData = [{id: 'Image', contentType: 'img'}, {id: 'Text', contentType: 'txt'}] ;
  public imageData = [{id: '1', imageType: 'carousel'}, {id: '2', imageType: 'banner'}];
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

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    let img: any[] = [];
    if (this.id != undefined){
      this.crudService.detail(this.id, 'util/content/detail').subscribe((res: any) => {

        this.formGroup.patchValue(res.data);
        this.validatorChecker(res.data.content_type);
        if(res.data.images){
          if (res.data.image_type === 'carousel'){
            this.carousel = true;
            img = res.data.images;
            img.forEach(element => {
              const url = `${environment.baseUrl}uploads/content/${this.id}/${element}`;
              this.imageArray.push(url);
            });
       
          }else if (res.data.image_type == 'banner'){
       
            this.carousel = false;
            this.image =  `${environment.baseUrl}uploads/content/${this.id}/${res.data.images[0]}`;
            this.imageArray.push(this.image)
            
          }
          
        }
  

        this.formGroup.get('image').setValue(this.imageArray)
        console.log(this.imageArray);
      });
      // this.imageArrayUrl = `${environment.baseUrl}uploads/product/area/${this.id}`;
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.formGroup = this.createControls(content);
  }
  onTrash(i= null){
       console.log(this.imageArray)
    if (i != null){
      this.imageArray.splice(i, 1);
      this.imageArrayUrl.splice(i, 1);
     // this.imageArray = [];
     console.log(this.imageArray)
    }
    else{

      this.selected = false;
      this.image = this.imgFrom;
      this.imageArray = [];
      this.imageArrayUrl = [];
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
disableButton(){
  if(this.formGroup.get('content_type').invalid
  || this.formGroup.get('content_title').invalid 
  // || this.formGroup.get('content_body').hasValidator
  || this.formGroup.get('status').invalid){
    this.tab.enableTab(1,false);
    return true;
   }else {
    this.tab.enableTab(1,true);
     return false;
   }
}
onTypeSelect(type){
  //  type.imageType == 'Carousel' ? !this.carousel : this.carousel;
  this.imageArray = [];
   if (type.imageType === 'carousel'){
     this.carousel = true;

   }else if (type.imageType === 'banner'){

     this.carousel = false;
     
   }
}
showLightbox(index, image) {
  this.imageObject = [{image, thumbImage: image}];
  this.currentIndex = index;
  this.showFlag = true;

  }
closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
onContentTypeSelected(value){
this.validatorChecker(value.contentType)
}

validatorChecker(contentType: string){
  if ( contentType === 'img'){
    this.crudService.getControl(this.formGroup, 'content_body').clearValidators();
    this.crudService.getControl(this.formGroup, 'content_body').updateValueAndValidity();
    this.crudService.getControl(this.formGroup, 'image_type').setValidators([Validators.required]);
    this.crudService.getControl(this.formGroup, 'image_type').updateValueAndValidity();
    this.crudService.getControl(this.formGroup, 'image_text').setValidators([Validators.required]);
    this.crudService.getControl(this.formGroup, 'image_text').updateValueAndValidity();
    this.crudService.getControl(this.formGroup, 'image').setValidators([Validators.required]);
    this.crudService.getControl(this.formGroup, 'image').updateValueAndValidity();
    }else{
      this.crudService.getControl(this.formGroup, 'image_type').clearValidators();
      this.crudService.getControl(this.formGroup, 'image_type').updateValueAndValidity();
      this.crudService.getControl(this.formGroup, 'image_text').clearValidators();
      this.crudService.getControl(this.formGroup, 'image_text').updateValueAndValidity();
      this.crudService.getControl(this.formGroup, 'image').clearValidators();
      this.crudService.getControl(this.formGroup, 'image').updateValueAndValidity();
      this.crudService.getControl(this.formGroup, 'content_body').setValidators([Validators.required]);
      this.crudService.getControl(this.formGroup, 'content_body').updateValueAndValidity();
    }
 }
  Submit($evt){
const payload = this.formGroup.value;
payload.image = this.imageArrayUrl;
if (this.formGroup.valid && payload.image){
  this.crudService.submit(payload, 'util/content', null, $evt, this.formGroup);
  this.formSubmitted = true;
}else{
  this.formSubmitted = true;
}
}
}
