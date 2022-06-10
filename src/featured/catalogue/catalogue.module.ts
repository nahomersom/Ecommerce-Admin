import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AuthGuard } from '@core/security/auth-guard.service';

const routes:Routes = [

  {
    path: 'area/create',
    component: AreaComponent,
    data: { page:'Area', action: 'canAdd', title: 'Area', breadCrumb: 'Create' , formTitle:'Create New Area'},
    canActivate: [AuthGuard]
  },
  {
    path: 'area/:id/update',
    component: AreaComponent,
    data: { page:'Area', action: 'canUpdate', title: 'Area', breadCrumb: 'Update', formTitle:'Update Existing Area' },
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/create',
    component: CategoriesComponent,
    data: { page:'Category', action: 'canAdd', title: 'Categories', breadCrumb: 'Create' , formTitle:'Create New Categories'},
    canActivate: [AuthGuard]
  },

  {
    path: 'categories/:id/update',
    component: CategoriesComponent,
    data: { page:'Category', action: 'canUpdate', title: 'categories', breadCrumb: 'Update', formTitle:'Update Existing Categories' },
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    AreaComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class CatalogueModule { }
