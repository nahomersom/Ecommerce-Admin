import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUserComponent } from './system-user/system-user.component';
import { ClientComponent } from './client/client.component';
import { GroupComponent } from './group/group.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { AuthGuard } from '@core/security/auth-guard.service';
const routes:Routes = [
  {
  path:'user/create',
  component:SystemUserComponent,
  data: { page:'System', action: 'canAdd', title: 'User', breadCrumb: 'Create' , formTitle:'Create New User'},
},
{
  path:'user/:id/update',
  component:SystemUserComponent,
  data: { page:'System', action: 'canUpdate', title: 'User', breadCrumb: 'Update' , formTitle:'Update Existing User'},
},
{
  path:'client/create',
  component:ClientComponent,
  data: { page:'Client', action: 'canAdd', title: 'Client', breadCrumb: 'Create' , formTitle:'Create New Client'},
},
{
  path:'client/:id/update',
  component:ClientComponent,
  data: { page:'Client', action: 'canUpdate', title: 'Client', breadCrumb: 'Update' , formTitle:'Update Existing Client'},
},
{
  path: 'client/:id/detail',
  component: ClientDetailComponent,
  data: { page:'Client', action: 'canViewDetail', title: 'Client', breadCrumb: 'Detail', formTitle:'Client Detail Information' },
  canActivate: [AuthGuard]
},
{
  path:'group/create',
  component:GroupComponent,
  data: { page:'Group', action: 'canAdd', title: 'Group', breadCrumb: 'Create' , formTitle:'Create New Group'},
},
{
  path:'group/:id/update',
  component:GroupComponent,
  data: { page:'Group', action: 'canUpdate', title: 'Group', breadCrumb: 'Update' , formTitle:'Update Existing Group'},
},
{
  path: 'user/profile',
  component: UserProfileComponent,
  data: { title: 'User Profile', breadCrumb: 'Profile', formTitle: 'Profile' },
},
]


@NgModule({
  declarations: [
    SystemUserComponent,
    ClientComponent,
    GroupComponent,
    UserProfileComponent,
    ClientDetailComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class GroupAndUserModule { }
