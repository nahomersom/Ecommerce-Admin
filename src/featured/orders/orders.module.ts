import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
const routes : Routes = [{
  path:'create',
  component: OrdersComponent,
  data: { page:'Order', action: 'canAdd', title: 'Orders', breadCrumb: 'Create' , formTitle:'Create New Order'},
  
},
{
  path:':id/detail',
  component:OrderDetailComponent,
},
{
  path:':id/update',
  component:OrdersComponent,
  data: { page:'Order', action: 'canUpdate', title: 'orders', breadCrumb: 'Update' , formTitle:'Update Existing Order'},
},
]

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class OrdersModule { }
