import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { variantOption } from './variant-option-control';

@Component({
  selector: 'app-variant-option',
  templateUrl: './variant-option.component.html',
  styleUrls: ['./variant-option.component.css']
})
export class VariantOptionComponent extends Base implements OnInit, OnDestroy{
  formGroup: FormGroup;
  formSubmitted:boolean = false;
  id:any = undefined;
  field:any = {text:'text', value:'value'};
  constructor(public crudService: CrudOperationService, public actRoute: ActivatedRoute , public httpCancelService: HttpCancelService) { 
   super(crudService);
    this.createForm();
    this.variant_option();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'variant/option/detail').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data);
      })
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
 
  }
  createForm(): void {
   this.formGroup = this.createControls(variantOption)
  }
  Submit($evt){
    let payload = this.formGroup.value;

    if(this.formGroup.valid){
      this.formSubmitted = true;
      this.crudService.submit(payload,'variant/option',null,$evt,this.formGroup);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
