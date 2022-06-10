import { T } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { environment } from '@environments/environment';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import {area} from 'featured/catalogue/area/area-control';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent extends Base implements OnInit , OnDestroy {
  imgURL: any;
  imgSrc: any;
  selected:boolean = false;
  formGroup: FormGroup;
  public image:any = null;
  id:any = undefined;
  image_url:any;
  formSubmitted: boolean = false;
  public imgFrom: any = null;

  @ViewChild('file')
  uploader:UploaderComponent;
  
  constructor(public crudService:CrudOperationService, public actRoute: ActivatedRoute, public httpCancelService: HttpCancelService) {
    super(crudService);
    this.createForm();
   }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'catalogue/area/detail/').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data)
        // this.formGroup.get('accept_stockout_order').setValue(res.data.accept_stockout_order == "1" ? true : false)
      })
      this.image = `${environment.baseUrl}uploads/product/area/${this.id}`;
      this.image_url = `${environment.baseUrl}uploads/product/area/${this.id}`;
      this.getControl(this.formGroup,'image').setValue(this.image);
    }
  }
  ngAfterViewInit(): void {
    document.getElementById('browse').onclick = (args) => {
      document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
  };
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.formGroup = this.createControls(area);
  }
  onTrash(){
    this.selected = false;
    this.image = this.imgFrom;
    this.image_url = this.image;
  }

  Submit($evt){
  
  let payload = this.formGroup.value;
  payload.image = this.image_url;
 // payload.accept_stockout_order = payload.accept_stockout_order  ? 1 : 0;
  if(this.formGroup.valid && payload.image){


    this.crudService.submit(payload,'catalogue/area',null,$evt,this.formGroup);
    
  } else {
 
    this.formSubmitted = true;

  }
  
  }

}
