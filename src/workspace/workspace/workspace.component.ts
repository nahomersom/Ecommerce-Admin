import { C, I, T } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { NodeSelectEventArgs, SidebarComponent, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastrService } from 'ngx-toastr';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit{
  toogleRequestContent: boolean = false;
  tooglePaymentContent: boolean = false;
  toogleContractContent: boolean = false;
  supplierId: string;
  toogleOrderContent: boolean;
  constructor(public router: Router, public security: SecurityService, private toastr: ToastrService, private crud?: CrudOperationService ) {
    this.toastr.toastrConfig.enableHtml = true;

  }
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance: SidebarComponent;
  @ViewChild('tree') tree: TreeViewComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  public targetElement: HTMLElement;
  public notification: number;
  public width = '290px';
  public mediaQuery: string = ('(min-width: 600px)');
  public target = '.main-content';
  public index: number;
  public samplePaymentOverDueData = [{full_name:'faysel',delivered_date:'2022-10-03',},{full_name:'sura',delivered_date:'2022-10-03',}]
  public sampleOrder = [{full_name:'sura',order_number:'73873487438',created_at:'10-3-2020'},{full_name:'faya',order_number:'73873487438',created_at:'10-3-2020'}]
  // public orders = [{
  //   id: 1,
  //   orderTitle: 'hi',
  //   orderContent: 'urgent order',
  //   date: '11-20-2021'
  //   },
  //   {
  //   id: 1,
  //   orderTitle: 'hi',
  //   orderContent: 'order around piassa',
  //   date: '11-20-2021'
  //   },
  //   {
  //   id: 1,
  //   orderTitle: 'hi',
  //   orderContent: 'order canceled',
  //   date: '11-20-2021'
  //   },
  //   {
  //   id: 1,
  //   orderTitle: 'hi',
  //   orderContent: 'urgent order',
  //   date: '11-20-2021'
  //   }


  // ];

  public dropdownItems: ItemModel[] = [
  {
      text: 'Change password', id: '1'
  },
  {
      text: 'Update Profile', id: '2'
  },
  {
    separator : true
  },
  {
      text: 'Logout', id: '3'
  }];

  public data: Object[] = [
      {
          nodeId: '01', nodeText: 'Dashboard', iconCss: 'icon-dashboard icon', url: 'ws', page: 'Dashboard',
      },
      {
        nodeId: '02', nodeText: 'Contract & Extensions', iconCss: 'icon-contract icon', expanded: false, url: null, page: null,
        nodeChild: [
          { nodeId: '02-01', nodeText: 'Contract', iconCss: 'icon-contract icon', url: 'ws/contract/list', page: 'ContractItem' },
          { nodeId: '02-02', nodeText: 'Extension', iconCss: 'icon-extension icon', url: 'ws/contract_extension/list', page: 'ContractExtension' },

        ]
    },
    {
      nodeId: '03', nodeText: 'Catalogue', iconCss: 'icon-catalogue icon', expanded: false, url: null, page: null,
      nodeChild: [
        { nodeId: '03-01', nodeText: 'Area', iconCss: 'icon-area icon', url: 'ws/area/list', page: 'Area' },
        { nodeId: '03-02', nodeText: 'Categories', iconCss: 'icon-categories icon', url: 'ws/categories/list', page: 'Category' },


      ]
  },
      {
          nodeId: '04', nodeText: 'Warehouse & Store', iconCss: 'icon-warehouse icon', expanded: true, url: null, page: null,
          nodeChild: [
            { nodeId: '04-01', nodeText: 'Warehouse', iconCss: 'icon-warehouse icon', url: 'ws/warehouse/list', page: 'Warehouse' },
            { nodeId: '04-02', nodeText: 'Store', iconCss: 'icon-store icon', url: 'ws/store/list', page: 'Store' },
            { nodeId: '04-03', nodeText: 'Inventory', iconCss: 'icon-inventory icon', url: 'ws/inventory/list', page: 'Inventory' },
            { nodeId: '04-04', nodeText: 'Product', iconCss: 'icon-product icon', url: 'ws/product/list', page: 'Product' },
            { nodeId: '04-05', nodeText: 'Variants', iconCss: 'icon-variants icon', url: 'ws/variants/list', page: 'Item' },
            { nodeId: '04-06', nodeText: 'Variant option', iconCss: 'icon-variants-option icon', url: 'ws/variantOption/list', page: 'Option' },
          ]
      },
      {
        nodeId: '05', nodeText: 'Orders', iconCss: 'icon-orders icon', expanded: false, url: 'ws/orders/list', page: 'Order'
      },

      {
        nodeId: '06', nodeText: 'User and Group', iconCss: 'icon-group icon', expanded: false, url: null, page: null,
        nodeChild: [
          { nodeId: '06-01', nodeText: 'System User', iconCss: 'icon-system icon', url: 'ws/systemUser/list', page: 'System' },
          { nodeId: '06-02', nodeText: 'Group', iconCss: 'icon-group icon', url: 'ws/group/list', page: 'Group' },
          { nodeId: '06-03', nodeText: 'Client', iconCss: 'icon-storekeeper icon', url: 'ws/client/list', page: 'Client' },
          { nodeId: '06-04', nodeText: 'Supplier', iconCss: 'icon-supplier icon', url: 'ws/supplier/list', page: 'Supplier' },

        ]
    },
      {
        nodeId: '07', nodeText: 'Settings & Configuration', iconCss: 'icon-setting icon', expanded: false, url: null, page: 'Setting',
        nodeChild: [
          { nodeId: '07-01', nodeText: 'Content', iconCss: 'icon-content icon', url: 'ws/content/list', page: 'Content' },
          { nodeId: '07-02', nodeText: 'Lookups', iconCss: 'icon-lookup icon', url: 'ws/lookup/list', page: 'Lookup' },
          { nodeId: '07-03', nodeText: 'Setting', iconCss: 'icon-setting icon', url: 'ws/setting/emailConfiguration', page: 'Setting' },
          { nodeId: '07-04', nodeText: 'Packages', iconCss: 'icon-box icon', url: 'ws/packages/list', page: 'Package' },
          {nodeId: '07-05', nodeText: 'Language', iconCss: 'icon-language icon', url: 'ws/language/list', page: 'Language'}
        ]
      },
      {
        nodeId: '08', nodeText: 'Accounting', iconCss: 'icon-payments icon', expanded: false, url: null, page: null,
        nodeChild: [
          { nodeId: '08-01', nodeText: 'Payment', iconCss: 'icon-payment icon', url: 'ws/payment/list', page: 'Payment' },
          { nodeId: '08-02', nodeText: 'Bank Account', iconCss: 'icon-bank icon', url: 'ws/bank/list', page: 'Bank' },
        ]
    },

      {
        nodeId: '09', nodeText: 'Feedback and Complain', iconCss: 'icon-feedback icon', expanded: false, url: 'ws/feedback/list', page: 'Feedback'
      },
      // {
      //   nodeId: '10', nodeText: 'Report', iconCss: 'icon-report icon', expanded: false, url: 'ws/report/list', page: 'report'
      // }
  ];

  public field: Object = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };
  ngOnInit(): void {
  
    if(this.security.securityObject?.is_supplier){
      this.getOrders(this.security.securityObject.id);
    }
    else{
      this.getNotifications();
      this.getPaymentOverdue(this.security.securityObject.id);
       this.getExpiredContract();
    }

  }
  public route(args: NodeSelectEventArgs): void {

    const data: any = this.tree.getTreeData(args.node);
    const url: string = data[0].url;

  //  let arr = [1,5,9,10];
   
  //  if(arr.includes(parseInt(this.tree.selectedNodes[0]))){
     
  //    this.tree.expandAll(["04"]);
  //    this.tree.expandOn = "None";

  //   }
  
    if (url !== null) {

      if (this.security.hasClaim(data[0].page, 'canView')){
        this.router.navigate([url]);
  
      } else {
        this.toastr.error('unauthorized to open this page.');
      }

    } else {
      this.hideNotifications();
      this.tree.collapseAll();
      this.tree.expandAll([args.node]);
      this.tree.expandOn = 'None';

    }

  }

  public getNotifications(){
    var _this = this;
    this.security.intervals = setInterval(function() {
       _this.crud.list('util/dashboard/UserRequest').subscribe((res: any) => {
        _this.security.securityObject.notifications.userRequest = res.data; 
      });
    },50000);
  }
  public getPaymentOverdue(supplierId){
    var _this = this;
    this.security.intervals = setInterval(function() {
       _this.crud.list(`util/dashboard/PaymentOverdue/${supplierId}`).subscribe((res: any) => {
        _this.security.securityObject.notifications.paymentOverdue = res.data; 
      });
    },50000);
  }
  public getOrders(supplierId){
    var _this = this;
    this.security.intervals = setInterval(function() {
       _this.crud.list(`util/dashboard/Orders/${supplierId}`).subscribe((res: any) => {
        _this.security.securityObject.notifications.orders = res.data; 
      });
    },50000);
  }
  public getExpiredContract(){
    var _this = this;
    this.security.intervals = setInterval(function() {
       _this.crud.list('util/dashboard/ExpiredContract').subscribe((res: any) => {
        _this.security.securityObject.notifications.expiredContract = res.data; 
      });
    },50000);
  }
  onNotificationSelected(type,id){
   if(type=='client'){
     this.router.navigate(['ws/user-and-group/client/'+id+'/detail'])
   }else{
    this.router.navigate(['ws/supplier/'+id+'/detail'])
   }
  }
  hideNotifications(){
    console.log('hijkd')
    this.toogleRequestContent = false;
    this.tooglePaymentContent = false;
    this.toogleContractContent = false;
    this.toogleOrderContent = false;
  }
  toogleRequest(){
    this.toogleRequestContent = !this.toogleRequestContent;
    this.tooglePaymentContent = false;
    this.toogleContractContent = false;
    this.toogleOrderContent = false;
  }
  toogleOrder(){
    this.toogleOrderContent = !this.toogleOrderContent;
    this.toogleContractContent = false;
    this.tooglePaymentContent = false;
    this.toogleRequestContent = false;

  }
  tooglePaymentOverDue(){
  this.tooglePaymentContent = !this.tooglePaymentContent;
  this.toogleRequestContent = false;
  this.toogleContractContent = false;
  this.toogleOrderContent = false;
  }
  toogleContract(){
   
    this.toogleContractContent = !this.toogleContractContent;
    this.toogleRequestContent = false;
    this.tooglePaymentContent  = false;
    this.toogleOrderContent = false;
  }
  openClick() {
    this.sidebarTreeviewInstance.toggle();
  }
  openDashboard(){
    this.router.navigateByUrl('ws');
  }
  onContractSelected(id){
   this.router.navigateByUrl(`ws/supplier/contract/${id}/update`);
  }

  onSelect(value){
    if (value === 1){
      this.router.navigateByUrl('ws/change-password');
    }

    if (value === 2){
      this.router.navigateByUrl('ws/user-and-group/user/profile');
    }

    if (value === 3){
      if (confirm('are you sure want to logging out from the system ?')){
        this.security.logout();
       
      }
    }


  }



}
