import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{
  path: 'create', 
  component: ReportComponent,
  data: { page:'report', action: 'canAdd', title: 'Report', breadCrumb: 'Create' , formTitle:'Generate new Report'}
}]



@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportModule { }
