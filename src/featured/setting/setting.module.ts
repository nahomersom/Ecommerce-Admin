import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { LookupComponent } from './lookup/lookup.component';
import { EmailConfigurationComponent } from './email-configuration/email-configuration.component';
import { PackagesComponent } from './packages/packages.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import {
  AngularImageViewerModule
} from 'angular-x-image-viewer';

import {LinkService, ImageService, HtmlEditorService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { LanguageComponent } from './language/language.component';
import { VariantComponent } from './variant/variant.component';
import { VariantOptionComponent } from './variant-option/variant-option.component';
const routes: Routes = [
  {
    path: 'lookup/create',
    component: LookupComponent,
    data: { page: 'Lookup', action: 'canAdd', title: 'Lookup', breadCrumb: 'Create' , formTitle: 'Create New Lookup'},
  },
  {
    path: 'lookup/:id/update',
    component: LookupComponent,
    data: { page: 'Lookup', action: 'canUpdate', title: 'Content', breadCrumb: 'Update' , formTitle: 'Update Existing Lookup'},
  },

  
  {
    path: 'language/create',
    component: LanguageComponent,
    data: { page: 'Language', action: 'canAdd', title: 'language', breadCrumb: 'Create' , formTitle: 'Create New language'},
  },
  {
    path: 'language/:id/update',
    component: LanguageComponent,
    data: { page: 'Language', action: 'canUpdate', title: 'language', breadCrumb: 'Update' , formTitle: 'Update Existing language'},
  },



  {
    path: 'content/create',
    component: ContentComponent,
    data: { page: 'Content', action: 'canAdd', title: 'Content', breadCrumb: 'Create' , formTitle: 'Create New Content'},
  },
  {
    path: 'content/:id/update',
    component: ContentComponent,
    data: { page: 'Content', action: 'canUpdate', title: 'Content', breadCrumb: 'Update' , formTitle: 'Update Existing Content'},
  },
  {
    path: 'emailConfiguration',
    component: EmailConfigurationComponent,
    data: { page: 'Setting', action: 'canAdd', title: 'Email Configuration', breadCrumb: 'Create' , formTitle: 'Create New Email Configuration'},
  },
  {
    path: 'packages/create',
    component: PackagesComponent,
    data: { page: 'Packages', action: 'canAdd', title: 'Packages', breadCrumb: 'Create' , formTitle: 'Create New Packages'},
  },
  {
    path: 'packages/:id/update',
    component: PackagesComponent,
    data: { page: 'Packages', action: 'canUpdate', title: 'Packages', breadCrumb: 'Update' , formTitle: 'Update Existing Package'},
  },
  {
    path: 'variant/create',
    component: VariantComponent,
    data: { page: 'Item', action: 'canAdd', title: 'variant', breadCrumb: 'Create' , formTitle: 'Create New Variant'},
  },
  {
    path: 'variant/:id/update',
    component: VariantComponent,
    data: { page: 'Item', action: 'canUpdate', title: 'variant', breadCrumb: 'Update' , formTitle: 'Update Existing Variant'},
  },
  {
    path: 'variant-option/create',
    component: VariantOptionComponent,
    data: { page: 'option', action: 'canAdd', title: 'variant-option', breadCrumb: 'Create' , formTitle: 'Create New Variant Option'},
  },
  {
    path: 'variant-option/:id/update',
    component: VariantOptionComponent,
    data: { page: 'option', action: 'canUpdate', title: 'variant-option', breadCrumb: 'Update' , formTitle: 'Update Existing Variant Option'},
  },

];

@NgModule({
  declarations: [
    ContentComponent,
    LookupComponent,
    EmailConfigurationComponent,
    PackagesComponent,
    LanguageComponent,
    VariantComponent,
    VariantOptionComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, AngularImageViewerModule
  ],
  providers: [
    LinkService,
    ImageService,
    HtmlEditorService,
    ToolbarService
  ]
})
export class SettingModule { }
