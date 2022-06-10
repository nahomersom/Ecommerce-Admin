
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {contractExtension} from 'featured/supplier/contract-extension/contractExtension-controls';
@Component({
  selector: 'app-contract-extension',
  templateUrl: './contract-extension.component.html',
  styleUrls: ['./contract-extension.component.css']
})
export class ContractExtensionComponent extends Base implements OnInit , OnDestroy{
  contractExtensionFormGroup: FormGroup;
  minDate : Date = new Date();
  formSubmitted: boolean = false;
  id:any = undefined;
  public fields: any = { text: 'text', value: 'value' };
  constructor(public crudService: CrudOperationService,public actRoute: ActivatedRoute , public httpCancelService: HttpCancelService) { 

    super(crudService);
    this.createForm();
    this.load_contract();
  
  }
  public dateValue: Date = new Date();
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'contract/contractExtension/detail').subscribe((res: any)=>{
        this.contractExtensionFormGroup.patchValue(res.data)
      })
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.contractExtensionFormGroup = this.createControls(contractExtension)
  }
  Submit($evt){
    let payload = this.contractExtensionFormGroup.value;
    let date = new Date(payload.extention_date);
    payload.extention_date = date;
    if(this.contractExtensionFormGroup.valid){
       this.formSubmitted = true;
      this.crudService.submit(payload,'contract/contractExtension',null,$evt,this.contractExtensionFormGroup);
       
    }
    else{
      this.formSubmitted = true;
    }
      }
  

}