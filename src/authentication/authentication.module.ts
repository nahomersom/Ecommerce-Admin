import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { PageNotFoundComponent } from '../featured/page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'find',
    component: ForgotPasswordComponent,
  }

];

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    CommonModule,
    CheckBoxModule,
    ButtonModule,
    TextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
