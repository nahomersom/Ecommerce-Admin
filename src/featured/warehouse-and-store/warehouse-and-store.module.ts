import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { StoreComponent } from './store/store.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes : Routes = [
 { 
   path:'warehouse/create',
   component:WarehouseComponent,
   data: { page:'Warehouse', action: 'canAdd', title: 'Warehouse', breadCrumb: 'Create' , formTitle:'Create New Warehouse'},
 },
 { 
  path:'warehouse/:id/update',
  component:WarehouseComponent,
  data: { page:'Warehouse', action: 'canUpdate', title: 'Warehouse', breadCrumb: 'Update' , formTitle:'Update Existing Warehouse'},
},
 { 
   path:'store/create',
   component:StoreComponent,
   data: { page:'Store', action: 'canAdd', title: 'Store', breadCrumb: 'Create' , formTitle:'Create New Store'}, 
 },
 { 
  path:'store/:id/update',
  component:StoreComponent,
  data: { page:'Store', action: 'canUpdate', title: 'Store', breadCrumb: 'Update' , formTitle:'Update Existing Store'},
},
{ 
  path:'inventory/create',
  component:InventoryComponent,
  data: { page:'Inventory', action: 'canAdd', title: 'Inventory', breadCrumb: 'Create' , formTitle:'Create New Inventory'}, 
},
{ 
  path:'inventory/:id/update',
  component:InventoryComponent,
  data: { page:'Inventory', action: 'canUpdate', title: 'Inventory', breadCrumb: 'Update' , formTitle:'Update Existing Inventory'},
},
{ 
  path:'product/create',
  component:ProductComponent,
  data: { page:'Product', action: 'canAdd', title: 'Product', breadCrumb: 'Create' , formTitle:'Create New Product'},  
},
{ 
  path:'product/:id/update',
  component:ProductComponent,
  data: { page:'Product', action: 'canUpdate', title: 'Product', breadCrumb: 'Update' , formTitle:'Update Existing Product'},
},
];


@NgModule({
  declarations: [
    WarehouseComponent,
    StoreComponent,
    InventoryComponent,
    ProductComponent,
    
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ],
  providers: []
})
export class WarehouseAndStoreModule { }
