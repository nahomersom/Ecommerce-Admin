import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {packages} from './packages-control';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent extends Base implements OnInit, OnDestroy{
  packagesFormGroup: FormGroup;
  id: any = undefined;
  formSubmitted = false;
  public fields: object = {text: 'text', value: 'value'};
  public packageFields: object = {text: 'value',value:'value'}
  public paymentType: Array<Object> = [{text: 'monthly', value: 'monthly'}, {text: 'annually', value: 'annually'}];
  constructor(public httpCancelService:HttpCancelService, public crudService: CrudOperationService, public actRoute: ActivatedRoute ) {
    super(crudService);
    this.createForm();
    this.load_package_group();
  }

  ngOnInit(): void {
  this.id = this.actRoute.snapshot.params.id;
  if (this.id != undefined){
    this.crudService.detail(this.id, 'util/package/detail').subscribe((res: any) => {
      this.packagesFormGroup.patchValue(res.data);
    });
  }
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm(): void {
    this.packagesFormGroup = this.createControls(packages);
  }
  load_package_group() {
    const payload = { lookup_type: 'package_group' };
    this.load_lookup(payload);
  
  }
  Submit($evt){
    const payload = this.packagesFormGroup.value;
    if (this.packagesFormGroup.valid){
    this.formSubmitted = true;
    this.crudService.submit(payload, 'util/package', null, $evt, this.packagesFormGroup);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
