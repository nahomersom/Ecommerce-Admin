
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { AppUserAuth, SecurityService } from '@core/security/security.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  supplierId: any;
  url: any;
  constructor(public crudService: CrudOperationService, public httpCancelService: HttpCancelService, public securityService: SecurityService) {}
  public contour: any = [3, 6, 4, 1, 3, 2, 5];
  public primaryXAxis: Object;
  public tooltip: Object;
  public chartData: Object[];
  public title: string;
  public primaryYAxis: Object;
  public pageSettings: PageSettingsModel;
  public piedata: Object[];
  public enableSmartLabels: boolean;

  public map: Object = 'fill';
  public datalabel: Object;

  active_orders: number;
  total_orders: number;
  today_sales: number;
  today_total_sold_product: number;
   status: any;
   total: any;

   order_summery: any = [{ text: 'no data available', x: 100, y: 100 }];

  public legendSettings: Object = {
    visible: false
};
  public recent_orders: object[];

  columens = [
    {
      field: 'order_number',
      headerText: 'Order #',
      textAlign: 'left',
      width: 100,
      status: false,
      type: 'string',
    },
    {
        field: 'quantity',
        headerText: 'Quantity',
        textAlign: 'left',
        width: 100,
        status: false,
        type: 'string',
    },
    {
        field: 'price',
        headerText: 'Price',
        textAlign: 'left',
        width: 100,
        status: false,
        type: 'string',
    },
    {
        field: 'date',
        headerText: 'Date',
        textAlign: 'left',
        format: 'N3',
        width: 100,
        status: false,
        type: 'string',
    },
    {
        field: 'order_status',
        headerText: 'Status',
        textAlign: 'center',
        width: 100,
        status: true,
        type: 'string',
    }
  ];

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }

  ngOnInit(): void {
    this.getCardContent();
    this.getPieChartContent();
    this.getSalesChartContent();

    this.tooltip = {
      enable: true
  };

    this.primaryXAxis = {
        title: 'Product',
        valueType: 'Category'
    };
    this.primaryYAxis = {
      title: 'Amount',
        labelFormat: 'ETB {value}'
    };

    this.pageSettings = { pageSize: 5 };

    this.datalabel = { visible: true,  position: 'Outside' };
    this.enableSmartLabels = true;

  }

  ngAfterViewInit(){
    this.getrecentOrders();

  }

  getCardContent(){
  let url = this.getUrl('util/dashboard/cards');
  this.crudService.list(url).subscribe((res: any) => {
      this.active_orders = res.data.active_orders;
      this.total_orders = res.data.total_orders;
      this.today_sales = res.data.today_sales;
      this.today_total_sold_product = res.data.today_total_sold_product;
    });
  }

  getPieChartContent(data = null){
    let url = this.getUrl('util/dashboard/best_sales');
    let payload = null;

    if (data){
      data[0] = new Date(data[0] + 'UTC');
      data[1] = new Date(data[1] + 'UTC');

      payload = { start: data[0], end: data[1] };

    }

    this.crudService.post(payload, url).subscribe((res: any) => {
      this.order_summery = res.data.summery;
    });

  }
  getrecentOrders(){
    let url = this.getUrl('util/dashboard/active_orders');
    this.crudService.list(url).subscribe((res: any) => {
      this.recent_orders = res.data;
    });

  }

  getSalesChartContent(){
    let url = this.getUrl('util/dashboard/total_sales');
    this.crudService.list(url).subscribe((res: any) => {
      this.chartData = res.data;
    });

  }
  getUrl(url){
    let  security = this.securityService.securityObject;
    if(security){
      if(security.is_supplier){
        return security.id ? this.url = url + '/' + security.id : this.url = url;   
       }
    }
 
  }
}
