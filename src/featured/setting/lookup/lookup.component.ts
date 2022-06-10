
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import {lookup} from './lookup-control';
@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent extends Base implements OnInit , OnDestroy{
  lookupGroup: FormGroup;
  formSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;

  public id: any = null;
  public lookup_types: any[] = [];
  public parents: any[] = [];
  public fields: any = { text: 'text', value: 'value' };
  public parent_type: any;
  constructor(public crudService: CrudOperationService, public actRoute: ActivatedRoute , public httpCancelService:HttpCancelService) {
    super(crudService);
    this.createForm();
    this.load_lookup_type();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    if (this.id !== null){
      this.crudService.detail(this.id, 'util/lookup/detail').subscribe((res: any) => {
        console.log(res.data);
        this.lookupGroup.patchValue(res.data);
      });


    }

  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.lookupGroup = this.createControls(lookup);
  }
  load_lookup_type(){
    this.crudService.list('Util/Lookup/load_lookup_key',true).subscribe((res: any) => {
        this.lookup_types = res.data;
      });

  }

  load_parents(value, parent_type){
   
    this.parent_type = parent_type;

    if (parent_type){
      this.lookupGroup.get('parent_id').addValidators(Validators.required);

    } else {
      this.lookupGroup.get('parent_id').clearValidators();

    }

    this.lookupGroup.get('parent_id').updateValueAndValidity();

    const payload = { lookup_type: value , project_type: 'ecommerce'};

    this.crudService.post(payload, 'Util/Lookup/load_parent',true).subscribe((res: any) => {

        this.parents = res.data;


    });

  }
  Submit($evt){
    const payload = this.lookupGroup.value;
    // let exempt:String[] = ['region','city','sub_city','language'];
    // if(!exempt.includes(this.lookupGroup.get('lookup_type').value)){
    //   payload.project_type = "ecommerce";
    // }
    // else {
    //   payload.project_type = null;
    // }
    payload.project_type = "ecommerce";
    if (this.lookupGroup.valid){
    this.formSubmitted = true;
    this.crudService.submit(payload, 'Util/Lookup', null, $evt, this.lookupGroup,true);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
