import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
import { ContractComponent } from './contract/contract.component';
import { ContractExtensionComponent } from './contract-extension/contract-extension.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AuthGuard } from '@core/security/auth-guard.service';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
const routes:Routes = [

  {
    path: 'create',
    component: SupplierComponent,
    data: { page:'Supplier', action: 'canAdd', title: 'Supplier', breadCrumb: 'Create' , formTitle:'Create New Supplier'},
   
    canActivate: [AuthGuard]
  },
  {
    path: ':id/update',
    component: SupplierComponent,
    data: { page:'Supplier', action: 'canUpdate', title: 'Supplier', breadCrumb: 'Update', formTitle:'Update Existing Supplier' },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/detail',
    component: SupplierDetailComponent,
    data: { page:'Supplier', action: 'canViewDetail', title: 'Supplier', breadCrumb: 'Detail', formTitle:'Supplier Detail Information' },
    canActivate: [AuthGuard]
  },
  {
    path: 'contract/create',
    component: ContractComponent,
    data: { page:'contractItem', action: 'canAdd', title: 'Contract', breadCrumb: 'Create' , formTitle:'Create New Contract'},
    canActivate: [AuthGuard]
   
  },
  {
    path: 'contract/:id/update',
    component: ContractComponent,
    data: { page:'contractItem', action: 'canUpdate', title: 'Contract', breadCrumb: 'Update', formTitle:'Update Existing Contract' },
    canActivate: [AuthGuard]
  },
  {
    path: 'contract_extension/create',
    component: ContractExtensionComponent,
    data: { page:'contractExtension', action: 'canAdd', title: 'Contract Extension', breadCrumb: 'Create' , formTitle:'Create New Contract Extension'},
    canActivate: [AuthGuard]
  },
  {
    path: 'contract_extension/:id/update',
    component: ContractExtensionComponent,
    data: { page:'contractExtension', action: 'canUpdate', title: 'Contract', breadCrumb: 'Update', formTitle:'Update Existing Contract Extension' },
    canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [
    SupplierComponent,
    ContractComponent,
    ContractExtensionComponent,
    SupplierDetailComponent,

  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class SupplierModule { }
