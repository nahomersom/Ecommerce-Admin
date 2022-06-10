import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Column, CommandModel, EditSettingsModel, FilterSettingsModel, GridComponent, GridModel, GroupSettingsModel, IRow, PageSettingsModel, SearchSettingsModel, SelectionSettingsModel, SortEventArgs } from '@syncfusion/ej2-angular-grids';
import { EmitType, closest } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { environment } from '@environments/environment';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastrService } from 'ngx-toastr';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { C, T } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.css'],
})
export class DynamicListComponent implements OnInit , OnDestroy {
  listType = null;
  currentPath = '';

  @Input() gridData: any;
  @Input() allowToolbar: any;
  @Input() incomingCommand: any;
  @Input() columns: any[] = [];
  @Input() childGrid: GridModel;
  @Input() grouped: boolean;
  @Input() groupBy: any;
  @Input() showColumnChooser = false;
  @Input() addPrivilege: boolean;
  @Input() editPrivilege: string;
  @Input() viewPrivilege: string;
  @Input() deletePrivilege: string;
  @Input() showAdd = false;
  @Input() showExcelExport = false;
  @Input() showSearch = false;
  @Input() showFilter = false;
  @Input() showCollapseAndExpand = false;
  @Input() showPdfExport = false;
  @Input() allowCheckbox = true;
  @Input() height: any;
  @Output() addRecord: EventEmitter<any> = new EventEmitter();
  @Output() editRecord: EventEmitter<any> = new EventEmitter();
  @Output() printRecord: EventEmitter<any> = new EventEmitter();
  @Output() viewRecord: EventEmitter<any> = new EventEmitter();
  @Output() deleteRecord: EventEmitter<any> = new EventEmitter();

  currentDeletingItem: any;
  pageSettings: PageSettingsModel;
  toolbar: Array<any>;
  searchOptions: SearchSettingsModel;
  groupOptions: GroupSettingsModel;
  editSettings: EditSettingsModel;
  commands: CommandModel[] = [];
  onFilter = false;
  pageSizes = ['10', '50', '100', '200', 'All'];
  filterOptions: FilterSettingsModel;
  resizeSettings = { mode: "Normal" };
  public searchField:any;

  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  public animationSettings: any = { effect: 'Zoom', duration: 400, delay: 0 };

  public targetElement: HTMLElement;

  public data: any;

  public selectionOptions: SelectionSettingsModel = {checkboxOnly: true, type: 'Multiple' };
  supplierArray: string[] = [];
  public selection: any[] = [];
  filter_columens: any[] = [];
  sorting_columens: any[] = [];
  searchString: any = null;
  dataApiUrl:any
  id: any;
  showToolbar: boolean = true;
  
  constructor( 
    private httpCancelService : HttpCancelService,
    private crudOperation: CrudOperationService, public securityService: SecurityService, 
    private activeRoute: ActivatedRoute, private toastr: ToastrService) {
     this.supplierArray.push(
       'accounting/payment',
       'accounting/bank',
       'market/warehouse',
       'market/store',
       'market/inventory',
       'catalogue/product',
       'util/feedback'
        
       )
    this.filterOptions = { type: 'Menu' };
    this.listType = this.activeRoute.snapshot.data.gridInfo;
    this.listType.type == 'notification' ? this.showToolbar : !this.showToolbar;
    this.pageSettings = { pageSize: 10, pageSizes: this.pageSizes };
    this.id = this.securityService.securityObject.id; 
    /* The below is to detect route change and execute tasks at navigation end to prevent multiple event in constructor */
      if (this.listType) {

        if(this.listType.dataApi == 'Util/Lookup'){
          this.dataApiUrl = `${this.listType.dataApi}/${'ecommerce'}/${this.pageSettings.pageSize}`;
        } 
        else if(this.supplierArray.includes(this.listType.dataApi)){
          if(this.securityService.securityObject.is_supplier){
            this.dataApiUrl = `${this.listType.dataApi}/${this.pageSettings.pageSize}/${this.id}`;
          }
          else{
            this.dataApiUrl = `${this.listType.dataApi}/${this.pageSettings.pageSize}`;
          }
        }else {
          this.dataApiUrl = `${this.listType.dataApi}/${this.pageSettings.pageSize}`;
        }
        
        this.incomingCommand = this.securityService.gridAction(this.listType.pageName);
        this.columns = this.gridData = [];
        this.prepareColumns();
        // if(securityService.securityObject.type == 'supplier'){
        //   this.dataApiUrl = this.dataApiUrl + this.securityService.securityObject.id;
        // }
        this.feedGrid(this.dataApiUrl);
        
        this.grouped = this.listType.grouped;
        this.groupOptions = { showGroupedColumn: true, columns: this.listType.groupBy };

      }
  } 
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }

  url(id){
    if(this.listType.image_url){

      let url = environment.baseUrl + this.listType.image_url + id+`?time=${new Date()}`;
  
      if(this.listType.profile){
        url = environment.baseUrl + this.listType.image_url + id + `/profile?time=${new Date()}`;
      }
      if(this.listType.thumbnail){
        url = environment.baseUrl + this.listType.image_url + id + "/thumbnail";
      }
      return url + ".jpeg";
    }

  }

  public hideDialog: EmitType<object> = () => {
		this.ejDialog.hide();
	}

	public deleteItem: EmitType<object> = () => {
		this.ejDialog.hide();
	}

	public buttons: any = [
		{
			click: this.delete.bind(this),
			buttonModel: { content: 'Yes', isPrimary: true }
		},
		{
			click: this.hideDialog.bind(this),
			buttonModel: { content: 'No' }
		}
	];

	public initilaizeTarget: EmitType<object> = () => {
		this.targetElement = this.container.nativeElement.parentElement;
		this.ejDialog.content = `are you sure want to delete (${ this.selection?.length }) records ?`;
	}

  ngOnInit(): void {
    this.searchField = null;
    this.selection = [];
    this.editSettings = { allowAdding: true };
    this.searchOptions = { operator: 'contains', key: this.listType.searchField, ignoreCase: true, };

    /* If its dynamic list will use this otherwise its sharable like before by exporting in featuredModule */
    if (this.listType) {
      this.showSearch = this.listType.showSearch;
      this.showColumnChooser = this.listType.showColumnChooser;
      this.showExcelExport = this.listType.showExcelExport;
      this.showFilter = this.listType.showFilter;
      this.showCollapseAndExpand = this.listType.showCollapseAndExpand;
      this.showPdfExport = this.listType.showPdfExport;
      this.allowCheckbox = this.listType.allowCheckbox;

      
      if('showAdd' in this.listType){
        this.addPrivilege = this.listType.showAdd;

      }
      else {
        this.addPrivilege = this.securityService.hasClaim(this.listType.pageName, 'canAdd');
      }
    if('showDelete' in this.listType){
      this.deletePrivilege = this.listType.showDelete;
    }else{
      this.deletePrivilege = this.incomingCommand.delete;
    }
      if(!this.listType.hasOwnProperty('type')){
        this.editPrivilege = this.incomingCommand.edit;
      }
     
      
      this.viewPrivilege = this.incomingCommand.view;
   
      this.addPrivilege ? this.showAdd = true : null;
    
    }
    
    this.initializeCommands();
    this.initializeToolBar();

  }

	ngAfterViewInit(): void {
		document.onclick = (args: any): void => {
			if (args.target.tagName === 'body') {
				this.ejDialog.hide();
			}
		};
	}

  async prepareColumns() {
    this.columns = [];
    this.gridData = [];
    this.listType.columns.forEach((col: any[]) => {
      this.columns.push(col);
    })
  }

  async feedGrid(dataApi: string) {
    let grid:boolean = false;
    this.listType.dataApi == 'Util/Lookup' ? grid = true: grid = false; 
    if(this.listType.method != "post"){
    this.crudOperation.list(dataApi,grid).subscribe((res: any) => {
       this.listType.pageName == 'notification' ? this.data = res.data.item : this.data = res.data;
       this.gridData = res.statusCode !== 404 ? this.data : [];      
      //  this.crudOperation.regenerateData(this.data, ['column_to_be-changed_to_string']);
     },(error:any)=>{
      this.toastr.error(error.message,'Error');

     }); 
    }else{
      this.crudOperation.post({project_type:'ecommerce'},dataApi).subscribe((data: any) => {
        this.data = data;
        this.gridData = data.statusCode !== 404 ? data.data : [];
       //  this.crudOperation.regenerateData(this.data, ['column_to_be-changed_to_string']);
      }, (error: any) => {
       this.toastr.error(error.message, 'Error');
      }); 
    }
    

  }

  navigate($endpoint: any) {
    this.crudOperation.navigate($endpoint);
  }

  delete() {
    if(this.selection.length){
      this.crudOperation.deleteRow(this.listType.deleteRowApi,this.selection,this);
    }

  }

  initializeCommands() {
    if (this.incomingCommand) {
      if (this.editPrivilege) {
        if (this.incomingCommand.edit === true &&  this.listType.dataApi !== 'util/feedback') {
          this.commands.push({
            type: 'Edit',
            buttonOption: {
              cssClass: 'e-flat',
              iconCss: 'e-edit e-icons',
              click: this.onEdit.bind(this),
            },
          });
        }
      }

      if (this.viewPrivilege) {
        if (this.incomingCommand.view === true) {
          if (this.listType.pageName == 'Order' || this.listType.pageName == 'Supplier' || this.listType.pageName == 'Client' || this.listType.dataApi == 'util/feedback'){

            this.commands.push({
              type: 'Edit',
              buttonOption: {
                cssClass: 'e-flat',
                iconCss: 'e-view e-icons',
                click: this.onView.bind(this),
              },
            });
          }
        }
      }
    }
  }

  onEdit(args: any): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(args.target as Element, '.e-row').getAttribute('data-uid')
    );
    const data1: any = rowObj.data;
    this.editRecord.emit(data1);
    this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/update') : null;
  }

  onView(args: any): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(args.target as Element, '.e-row').getAttribute('data-uid')
    );
    const data1: any = rowObj.data;
    this.viewRecord.emit(data1);

    if(this.listType.type != 'notification') {
      this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/detail') : null;
    }else{
      if(data1.being == 'client'){

        this.listType ? this.navigate('ws/user-and-group/client/'+data1.id+'/detail') : null;
      }
      else if(data1.being == 'supplier'){

        this.listType ? this.navigate('ws/supplier/'+data1.id+'/detail') : null;
      }else if(this.listType.formPath == 'ws/orders'){
        this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/detail') : null;
      }else{
        this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/update') : null;
      }
     
    }
 
  }

  initializeToolBar(): void {
    this.toolbar = [];
    
    if (this.addPrivilege) {
      if (this.showAdd) {
        this.toolbar.push('Add');
      }
    }

    if (this.deletePrivilege) {
      this.toolbar.push({
        text: 'Deletes',
        id: 'Deletes',
        tooltipText: 'Delete',
        prefixIcon: 'e-delete',
        disabled: true
      });
    }

    if (this.showSearch) {
      this.toolbar.push({
        text: 'Search',
        tooltipText: 'Search Items',
      });
    }

    if (this.showExcelExport) {
      this.toolbar.push('ExcelExport');
    }

    if (this.showPdfExport) {
      this.toolbar.push({
        text: 'PdfExport',
        tooltipText: 'PdfExport',
        prefixIcon: 'e-pdfexport',
      });
    }

    if (this.showColumnChooser) {
      this.toolbar.push({
        text: 'ColumnChooser',
        tooltipText: 'ColumnChooser',
      });
    }

  }

  toolbarClicked(args: ClickEventArgs): void {
    console.log(args.item)
    switch (args.item.text) {
      case 'Add':
        this.addRecord.emit(args.item.id);
        this.listType ? this.navigate(this.listType.formPath + '/create') : null;
        break;
      case 'Deletes':
        this.initilaizeTarget();
        this.ejDialog.show();
        break;
      case 'Filter':
        if (this.onFilter) {
          this.grid.allowFiltering = false;
          this.onFilter = !this.onFilter;
        } else {
          this.grid.allowFiltering = true;
          this.onFilter = !this.onFilter;
        }
        break;
      case 'Collapse':
        this.grid.groupModule.collapseAll();
        break;
      case 'Expand':
        this.grid.groupModule.expandAll();
        break;
      case 'Excel Export':
        this.grid.excelExport();
        break;
      case 'PdfExport':
        this.grid.pdfExport();
        break;
    }
  }

  public onRowSelected(data,status){
    data instanceof Array ? null : data = [data];

    data.forEach(ele => { 
      if(status){
        this.selection.push(ele.id);

      } else {
        let index = this.selection.indexOf(ele.id);
        this.selection.splice(index, 1); 

      }
    });

    this.grid.toolbarModule.enableItems(['Deletes'], this.selection?.length ? true : false);

  }

  actionComplete(args) {
    switch(args.requestType) {
      case 'searching':
      this.searchString = args.searchString !== '' ? args.searchString : null;
      this.submit_filter();
      break;

      case 'filtering':
      this.filter(args);
      this.submit_filter();
      break;

      case 'sorting':
      this.sorting(args);
      this.submit_filter();
      break;

      case 'paging':
      this.paging();
      break;

    }

  }



  submit_filter(){
    let value = this.grid.pagerModule.pagerObj.pageSize.toString();

    !this.pageSizes.includes(value) ? value = '99999999999999' : null;

    let payload = {  searchString: this.searchString,  filter:this.filter_columens, 
      sort:this.sorting_columens , limit:value, project_type:'ecommerce'
    };
    let isLookup;
    this.listType.pageName == "Lookup" ? isLookup = true : isLookup = false;
    this.crudOperation.post(payload, `${this.listType.dataApi}/search`,isLookup).subscribe((data: any) => {
      this.gridData = data.data;

    },(error:any)=>{
     this.toastr.error(error.message,'Error');
 
    }); 
  }

  paging(){
    let value = this.grid.pagerModule.pagerObj.pageSize;
    this.gridData.length >  value ? null : this.submit_filter();

  }
 

  filter(args){
    let cfo = args.currentFilterObject;

   if(args.action === 'clearFilter'){
    let index = this.filter_columens.findIndex((ele)=>{ ele.field === cfo.field });
    this.filter_columens.splice(index,1);

    } else {
      this.filter_columens.push({ 
        field : cfo.field,
        value : cfo.value,
        operator : cfo.operator,
       });
    }
  }

  sorting(args){
    let module:any = this.grid.sortModule;
    let direction = module.direction === "Ascending" ? "Asc" : "Desc";

    let index = this.sorting_columens.findIndex(ele => ele.field === module.columnName );
    
    if(index === -1){
      this.sorting_columens.push({ field : args.columnName, direction : direction });

    } else {
      if(this.sorting_columens[index].direction === "Asc"){
        this.sorting_columens[index].direction = "Desc";

      } else {
        this.sorting_columens.splice(index,1);

      }

    }

  }

 





}
