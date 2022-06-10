import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Location } from '@angular/common';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { Base } from '@core/utils/base';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent extends Base implements OnInit {
  public id: any = undefined;
  public detail: any;
  public url:any = environment.baseUrl + "uploads/client/"
  public disabled: boolean = false;
  public sending: boolean = false;
  public showReasonField: boolean = false;
  public fields: any = { text: 'text', value: 'value' };
  public reasonFields: any = { text: 'value', value: 'value' };
  public accountStatusData:any = [{value:'0',text:'disable'},{value:'1',text:'enable'}];
  public requestApprovalData:any = [{value:'0',text:'reject'},{value:'1',text:'accept'}];
  allowSubscription: boolean;
  subscription = new FormControl();
  constructor(
    public crudService: CrudOperationService,
    public actRoute: ActivatedRoute,
    private location: Location,
    private httpCancelService:HttpCancelService,
    private toast: ToastrService
  ) {
    super(crudService);
  }
  accountStatus = new FormControl();
  requestApproval = new FormControl();
  reason = new FormControl();
  ngOnInit(): void {

    this.loadReason();
    this.id = this.actRoute.snapshot.params.id;

    if (this.id !== undefined) {
      this.crudService.detail(this.id, 'users/client/detail_view/').subscribe((res: any) => {
        this.detail = res.data;
        this.subscription.setValue(res.data.ecommerce_client == 'active' ? true : false); 
        if(this.detail.reason != null){
          this.showReasonField = true;
          this.reason.patchValue(this.detail.reason);
        }
      
        
      });
    }

  }

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  }
 
  

  onBack(){
    this.location.back();
    }
    loadReason(){
      let payload:object = {lookup_type:'account_disable_reasons'}
      this.load_lookup(payload);
    
      }
      onStatusSelect(value){
        if(value == '0'){
          this.showReasonField = true;
          this.reason.addValidators(Validators.required);
          this.reason.updateValueAndValidity();
        }else{
          this.showReasonField = false;
          this.reason.setValue(null);
          this.reason.clearValidators();
          this.reason.updateValueAndValidity();
        }
       value == '0' ? this.showReasonField = true : this.showReasonField = false;
      }
      onSetSubscribiton(value){
        value ? this.allowSubscription = true : this.allowSubscription = false;
      }
      onSubmit(){
 
   
        let payload:any = { id: this.id,status: this.accountStatus.value , request_approval: this.requestApproval.value , reason: this.reason.value};
        payload.subscription = {ecommerce_client:this.allowSubscription ? 'active' : 'deactive'}
        if(this.reason.valid){
          if(window.confirm('Are you sure to perform this action?')){
          this.disabled = true;
          this.sending = true;
          this.crudService.post(payload,'users/client/status_update').subscribe((res)=>{
      
            if(res.status){
                 this.toast.success(res.message, 'Success');
                 this.location.back();
                }else{
                 this.toast.error(res.message, 'Error');
                }
                this.disabled = false;
                this.sending = false;
             });
           }else {
            return;
          }
       }
     
    }

}
