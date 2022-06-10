import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { SharedModule } from '@shared/shared.module';
import { gridData } from "@environments/grid-data"
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AuthGuard } from '@core/security/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* The path name in sidebar & json name should be the same */
let data = [
  { 
    formTitle:'Supplier Management' ,
    path:'supplier', 
    page:'Supplier', 
    title:'supplier' 
  },
  { 
    formTitle:'Contract Management' ,
    path:'contract', 
    page:'contractItem', 
    title:'contract' 
  },
  { 
    formTitle:'Area Management' ,
    path:'area', 
    page:'Area', 
    title:'Area' 
  },
  { 
    formTitle:'Categories Management' ,
    path:'categories', 
    page:'Category', 
    title:'Categories' 
  },
  { 
     formTitle:'Contract Extension Management' ,
     path:'contract_extension',
     page:'ContractExtension', 
     title:'Contract Extension' 
    },
  { 
    formTitle:'Warehouse Management' ,
    path:'warehouse', 
    page:'warehouse', 
    title:'Warehouse' 
  },
  { 
    formTitle:'Store Management' ,
    path:'store',
    page:'Store',
    title:'Store' 
    },
  { 
    formTitle:'Inventory Management' ,
    path:'inventory', 
    page:'Inventory', 
    title:'Inventory' 
  },
  { 
    formTitle:'Product Management' ,
    path:'product', 
    page:'Product', 
    title:'Product' 
  },
  { 
    formTitle:'Orders Management' ,
    path:'orders',
    page:'Order', 
    title:'Orders' 
  },

  { 
    formTitle:'User Management' ,
    path:'systemUser', 
    page:'System', 
    title:'System User' 
  },
  { 
    formTitle:'Client Management' ,
    path:'client', 
    page:'Client', 
    title:'Client'
   },
  { 
    formTitle:'User Group Management' ,
    path:'group', 
    page:'Group', 
    title:'Group' 
  },
  
  { 
    formTitle:'Content Management' ,
    path:'content', 
    page:'Content', 
    title:'Content' 
  },
  { 
    formTitle:'Packages Management' ,
    path:'packages', 
    page:'Package', 
    title:'Package' 
  },
  { 
    formTitle:'Lookup Management' ,
    path:'lookup',
    page:'Lookup', 
    title:'Lookup' 
    },
  { 
    formTitle:'Variants Management' ,
    path:'variants', 
    page:'Item', 
    title:'Variants' 
  },
  { 
    formTitle:'Variants Management' ,
    path:'variantOption',
    page:'Option', 
    title:'Variants' 
    },
  { 
    formTitle:'Payment Management' ,
    path:'payment', 
    page:'Payment',
    title:'payment'
  },
  { 
    formTitle:'Bank Account Management' ,
    path:'bank',
    page:'Bank',
    title:'Bank Account'
    },
  { 
    formTitle:'Feedback and Complain Management' ,
    path:'feedback', 
    page:'Feedback', 
    title:'Feedback'
   },
  { 
    formTitle:'Report Management' ,
    path:'report', 
    page:'report',
    title:'Report' 
    },
  { 
    formTitle:'language Management' ,
    path:'language',
    page:'Language', 
    title:'language' 
    },
  { 
      formTitle:'User Request Management' ,
      path:'request',
      page:'User', 
      title:'User Request' 
      },
  { 
        formTitle:'Expired Contract' ,
        path:'expiredContract',
        page:'contract', 
        title:'Expired Contract' 
        },
  { 
          formTitle:'Payment Overdue' ,
          path:'paymentOverdue',
          page:'payment', 
          title:'Payment Overdue' 
          },
  { 
            formTitle:'New Orders' ,
            path:'newOrders',
            page:'Orders', 
            title:'New Orders' 
            },

  ]
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { title: 'Dashboard', breadCrumb: 'Dashboard' },
  },
  /* Accessing all grid json from merged gridData file ...
   the type which will be sent from sidebar menu json and the key name in gridData json should be the same
   to get the grid json data */
 
    ...data.map(ele => ({
    path: ele.path + '/list',
    component: DynamicListComponent,
    data: { 
      formTitle:ele.formTitle,
      page:ele.page, action: 'canView', 
      title: ele.title.toUpperCase(), 
      breadCrumb: 'list', 
      gridInfo: gridData[ele.path] 
    },
    canActivate: [AuthGuard]

  })),
  {
    path: 'setting', 
    loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule),
    data: { breadCrumb: 'Settings' },
  },
  {
    path: 'supplier', 
    loadChildren: () => import('./supplier/supplier.module').then((m) => m.SupplierModule),
    data: { breadCrumb: 'Supplier' },
  },
  {
    path: 'catalogue', 
    loadChildren: () => import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
    data: { breadCrumb: 'Supplier' },
  },
  { 
    path:'warehouse-and-store', 
    loadChildren: () => import('./warehouse-and-store/warehouse-and-store.module').then((m) => m.WarehouseAndStoreModule),
    data: { breadCrumb: 'Warehouse and Store' },
  },
  { 
    path:'orders', 
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
    data: { breadCrumb: 'Orders' },
  },
  { 
    path:'change-password', 
    loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
    data: { breadCrumb: 'Change Password' },
  },
  { 
    path:'user-and-group', 
    loadChildren: () => import('./group-and-user/group-and-user.module').then((m) => m.GroupAndUserModule),
    data: { breadCrumb: 'Orders' },
  },
  { 
    path:'payments', 
    loadChildren: () => import('./payments/payments.module').then((m) => m.PaymentsModule)
  },
  {
    path:'**', 
    component:PageNotFoundComponent,
    pathMatch:'full'
  },
  { 
    path:'feedback-and-complain', 
    loadChildren: () => import('./feedback-and-complain/feedback-and-complain.module').then((m) => m.FeedbackAndComplainModule)
  },
  { 
    path:'report', 
    loadChildren: () => import('./report/report.module').then((m) => m.ReportModule)
  }
];

@NgModule({
  declarations: [
    DynamicListComponent,
  ],
  imports: [
    SharedModule,
    DialogModule,
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class FeaturedModule { }
