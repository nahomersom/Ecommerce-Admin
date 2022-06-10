import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [

{
  path:'bank-account/create',
  component:BankAccountComponent,
  data: { page:'Bank', action: 'canAdd', title: 'Bank Account', breadCrumb: 'Create' , formTitle:'Create New Bank Account'},
},
{
  path:'bank-account/:id/update',
  component:BankAccountComponent,
  data: { page:'Bank', action: 'canUpdate', title: 'Bank Account', breadCrumb: 'Update' , formTitle:'Update Existing Bank Account'},
},
{
  path:'payment/create',
  component:PaymentComponent,
  data: { page:'Payment', action: 'canAdd', title: 'Payment', breadCrumb: 'Create' , formTitle:'Create New Payment'},
},
{
  path:'payment/:id/update',
  component:PaymentComponent,
  data: { page:'Payment', action: 'canUpdate', title: 'Bank Account', breadCrumb: 'Update' , formTitle:'Update Existing Payment'},
},
]


@NgModule({
  declarations: [
    PaymentComponent,
    BankAccountComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class PaymentsModule { }
