import { registerLocaleData } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {globalroles} from './roles';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit , OnDestroy {

  public formgroup: FormGroup;
  public disable: false;
  public formSubmitted = false;
  public id = undefined;
  public isUpdate: boolean = false;
  public for: any = [
    {text: 'Supplier', value: 'supplier'},{text: 'System User', value: 'system'},
    {text: 'Client', value: 'client'}
  ];

  public fields: any = { value: 'value', text: 'value' };
  
  public actions: any[] = ['canAdd','canUpdate','canDelete','canView','canViewDetail'];

  public localroles: any[] = [
    { "title": "dashboard", "page": "Dashboard","canView":false },
    { "title": "Supplier", "page": "Supplier","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false,"canViewDetail":false },
    { "title": "Contract", "page": "ContractItem","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "contract Extension", "page": "ContractExtension","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Area", "page": "Area","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Categories", "page": "Category","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Warehouse", "page": "Warehouse","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Store", "page": "Store","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Inventory", "page": "Inventory","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Product", "page": "Product","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Product Variant", "page": "Item","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Product Variant Option", "page": "Option","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Orders", "page": "Order","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false,"canViewDetail":false },
    { "title": "System User", "page": "System","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Client", "page": "Client","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false,"canViewDetail":false },
    { "title": "Group & Role", "page": "Group","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Content", "page": "Content","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Lookups", "page": "Lookup","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Setting", "page": "Setting","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Packages", "page": "Package","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Payment", "page": "Payment","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false,"canViewDetail":false },
    { "title": "Bank Account", "page": "Bank","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Feedback and Complain", "page": "Feedback","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false,"canViewDetail":false },
    { "title": "Report", "page": "Report","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false },
    { "title": "Language", "page": "Language","canAdd":false,"canUpdate":false,"canDelete":false,"canView":false }
  ];

  public roles:any;

  selectAll(value) {
    this.roles.forEach(role => {
      this.actions.forEach(action => {
        role[action] !== null ? role[action] = value : null;
      });

    });
    
  }
 
  getChecked(value){
    return value === null ? false : value;
  }

  onChange(index,action,value){
    let role = this.roles[index];

    role[action] = value;
    this.roles[index] = role;

  }

  constructor(public httpCancelService: HttpCancelService,public service?: CrudOperationService,private router?: Router,
    private actRoute?: ActivatedRoute) {
    this.formgroup = new FormGroup({
      id : new FormControl(null),
      title : new FormControl(null, Validators.required),
      for : new FormControl(null, Validators.required),
      role : new FormControl(null),
    });
  }


  ngOnInit() {
    this.roles = [...this.localroles];

    this.id = this.actRoute.snapshot.params.id;
    if(this.id !== undefined) {
      this.isUpdate = true;

      this.service.detail(this.id,'users/group/detail').subscribe((res: any) => {
        this.formgroup.patchValue(res.data);

        let role = JSON.parse(res.data.role);

        let diffrence = this.roles.filter(({ page: id1 }) => !role.some(({ page: id2 }) => id2 === id1));

        this.roles = [...role,...diffrence];

        this.service.getControl(this.formgroup,'for').setValue(res.data.for);

      });

    }  else {
      this.preprocess();

    }


  }


  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }

  Submit($evt): any {
    if(!this.formgroup.valid || !this.filter().length) {
      this.formSubmitted = true;
      return;

    } else {
      this.service.getControl(this.formgroup,'role').setValue(JSON.stringify(this.roles));
      let payload = this.formgroup.value;
      payload.project_type = 'ecommerce';

      this.service.submit(payload,'users/group',null,$evt,this.formgroup);

    }
  }

  return_prop(obj){
    let prop = Object.keys(obj);
    prop.shift();
    return prop.filter(ele => ele!== 'page');
  }

  filter(){
   return this.roles.filter(role => role.canAdd === true || role.canUpdate === true  || 
          role.canDelete === true || role.canView === true || role.canViewDetail === true);
  }

  focusIn(target: HTMLElement){
    target.parentElement.classList.add('e-input-focus');
  }

  focusOut(target: HTMLElement){
    target.parentElement.classList.remove('e-input-focus');
  }

  preprocess(){
    this.roles.forEach(role => {
      let prop = this.return_prop(role);

      this.actions.forEach(action => {
        if(prop.includes(action)){
          role[action] = false;

        } else {
          role[action] = null;
          
        }

      });

    });

  }

  

}