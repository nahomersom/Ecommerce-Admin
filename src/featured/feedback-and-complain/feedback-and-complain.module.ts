import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackAndComplainComponent } from './feedback-and-complain/feedback-and-complain.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
  path: 'create', 
  component: FeedbackAndComplainComponent,
  data: { page:'Feedback', action: 'canAdd', title: 'Feedback and Complain', breadCrumb: 'Create' , formTitle:'Feedback and Complain'}
},
{
  path: ':id/detail', 
  component: FeedbackAndComplainComponent,
  data: { page:'Feedback', action: 'canUpdate', title: 'Feedback and Complain', breadCrumb: 'Update' , formTitle:'Feedback and Complain'}
}
]

@NgModule({
  declarations: [
    FeedbackAndComplainComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class FeedbackAndComplainModule { }
