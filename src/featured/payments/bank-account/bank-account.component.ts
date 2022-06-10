import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {bank} from './bank-control'
@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent extends Base implements OnInit, OnDestroy{
  bankFormGroup: FormGroup;
  formSubmitted:boolean = false;
  id:any = undefined;
  constructor(public crudService: CrudOperationService, public actRoute: ActivatedRoute, public httpCancelService:HttpCancelService) { 
    super(crudService);
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'accounting/bank/detail').subscribe((res: any)=>{
        this.bankFormGroup.patchValue(res.data);
      })
    }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  
  }
  createForm(): void {
   this.bankFormGroup = this.createControls(bank)
  }
  Submit($evt){
    let payload = this.bankFormGroup.value;
    payload.user_id = '61b48d106d9d8439364344';
    console.log(payload)
    if(this.bankFormGroup.valid){
      this.formSubmitted = true;
      this.crudService.submit(payload,'accounting/bank',null,$evt,this.bankFormGroup);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
