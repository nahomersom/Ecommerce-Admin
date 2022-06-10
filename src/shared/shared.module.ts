import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import {NumericTextBoxModule, TextBoxModule, UploaderModule} from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { DatePipe } from '@angular/common';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AccumulationAnnotationService, AccumulationChartModule, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, PieSeriesService } from '@syncfusion/ej2-angular-charts';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import {TreeSelectModule} from 'primeng/treeselect';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {
  GridModule,
  DetailRowService,
  PageService,

  SortService,
  FilterService,
  GroupService,
  ReorderService,
  ResizeService,
  ToolbarService,
  SearchService,
  CommandColumnService,
  EditService,
  ColumnChooserService,
  ExcelExportService,
  PdfExportService,
} from '@syncfusion/ej2-angular-grids';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { AppdivBreadCrumbModule } from 'appdiv-bread-crumb';
import {
  SidebarModule,
  MenuAllModule,
  TreeViewAllModule,
} from '@syncfusion/ej2-angular-navigations';
import {
  CheckBoxModule,
  RadioButtonModule,
  ButtonModule,
  ChipListModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ChartAllModule, ChartModule, SparklineModule, TooltipService } from '@syncfusion/ej2-angular-charts';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageIdentityComponent } from './page-identity/page-identity.component';
import { TabButtonsComponent } from './tab-buttons/tab-buttons.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsService } from '@core/interceptors/interceptors.service';

@NgModule({
  declarations: [FormButtonsComponent, PageIdentityComponent, TabButtonsComponent],
  imports: [
    CommonModule,
    GridModule,
    CheckBoxModule,
    ButtonModule,
    TextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AccumulationChartModule,
   
    
  ],
  exports: [
    TreeSelectModule,
    CascadeSelectModule,
    MultiSelectModule,
    DateTimePickerModule,
    AppdivBreadCrumbModule,
    CheckBoxModule,
    DialogModule,
    ButtonModule,
    DropDownListModule,
    SidebarModule,
    ListViewAllModule,
    RadioButtonModule,
    TreeViewAllModule,
    MenuAllModule,
    GridModule,
    FormButtonsComponent,
    TabButtonsComponent,
    TextBoxModule,
    NumericTextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    TabModule,
    UploaderModule,
    DatePickerModule,
    SparklineModule,
    ChartModule,
    ChartAllModule,
    ChipListModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    DropDownButtonModule,
    RadioButtonModule,
    AccumulationChartModule,
    SwitchModule,
    PageIdentityComponent,
    RichTextEditorModule,
    NgImageFullscreenViewModule,
    DropDownTreeModule,
    ColorPickerModule,

  ],
  providers: [
    DetailRowService,
    PageService,
    SortService,
    FilterService,
    GroupService,
    ReorderService,
    ResizeService,
    ToolbarService,
    SearchService,
    CommandColumnService,
    EditService,
    ColumnChooserService,
    ExcelExportService,
    PdfExportService,
    TooltipService,
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,
    CheckBoxSelectionService, 
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true,
    },
  ],
})
export class SharedModule { }
