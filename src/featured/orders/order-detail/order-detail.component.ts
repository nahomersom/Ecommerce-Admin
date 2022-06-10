import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Location } from '@angular/common';
import { T } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public id: any = undefined;
  public orderId:number;
  public detail: any;
  public orders:any[];
  public disabled: boolean = false;
  public sending: boolean = false;
  constructor(
    public crudService: CrudOperationService,
    public actRoute: ActivatedRoute,
    private httpCancelService:HttpCancelService,
    public location: Location, 
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;

    if (this.id !== undefined) {
      this.crudService.detail(this.id, 'catalogue/order/detail_view').subscribe((res: any) => {
        this.detail = res.data;
         this.orderId = res.data.id;

      });
    }

  }

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  }
  viewOnMap(lat,long){
   window.open(`https://www.google.com/maps/@${lat},${long},15z`);
  }
  getStatus(status){
   let data = ['Picked Up By Courier', 'Delivering', 'Delivered'];
   if(data.includes(status)){
     return true
   }
   else{
     return false;
   }
  }
  onBack(){
  this.location.back();
  }
  onSubmit(status){
    if(window.confirm('Are you sure to perform this action?')){
    this.disabled = true;
    this.sending = true;
    let payload = { id: this.id, order_status: status};
    this.crudService.post(payload,'catalogue/order/status_update').subscribe((res)=>{
       if(res.status){
        this.toast.success(res.message, 'Success');
       }else{
        this.toast.error(res.message, 'Error');
       }
       this.disabled = false;
       this.sending = false;
    });
  }
  }

}
