import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { variant } from './variant-control';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.css']
})
export class VariantComponent extends Base implements OnInit , OnDestroy{
  formGroup: FormGroup;
  formSubmitted:boolean = false;
  id:any = undefined;
  inputType:Array<Object> = [{text:'dropdown', value: 'dropdown'}]
  fields:Object = {text:'text', value: 'value'}
  constructor(public httpCancelService:HttpCancelService,public crudService: CrudOperationService, public actRoute: ActivatedRoute) { 
   super(crudService);
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'variant/item/detail').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data);
      })
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
   this.formGroup = this.createControls(variant)
  }
  Submit($evt){
    let payload = this.formGroup.value;

    if(this.formGroup.valid){
      this.formSubmitted = true;
      this.crudService.submit(payload,'variant/item',null,$evt,this.formGroup);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
