import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { contract } from 'featured/supplier/contract/contract-controls';
import { RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { ToastrService } from 'ngx-toastr';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent extends Base implements OnInit , OnDestroy{
  public dateValue: Date = new Date();
  formGroup:FormGroup;
  formSubmitted: boolean = false;
  attachment:any;
  id:any = undefined;
  isUpdate:boolean = false;
  attachment_url:any;
  isSelected:boolean = false;
  public minDate:Date;
  public deadline:Date;
  public fields: any = { text: 'text', value: 'value' };
  extendContract: boolean = false;
  extention_date = new FormControl();
  contract_id:String;
  sending = false;
  disableDate: boolean = true;
 
  constructor(   
    public crudService: CrudOperationService,
    public actRoute: ActivatedRoute,
   private httpCancelService: HttpCancelService,
   public toastr:ToastrService
    ) { 
    super(crudService);
    this.createForm();
    this.load_supplier();
    this.load_plan();
  }
  public onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
    this.formGroup.get('attachment').reset();
}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id !== undefined){
      this.crudService.detail(this.id,'contract/contractItem/detail/').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data)
        this.contract_id = res.data.id;
        this.minDate = new Date(res.data.deadline)
      })
      this.attachment_url = `${environment.baseUrl}uploads/contract/${this.id}`;
      this.formGroup.get('attachment').patchValue(this.attachment_url)
    }

  }
  onExtendContract(){
    this.extendContract = !this.extendContract;
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  createForm():void{
  this.formGroup = this.createControls(contract);
  }
  onOpenPdf(){
    window.open(this.attachment_url)
    this.isUpdate = true;
  }
  fileSelected(){
   this.isSelected = true;
  }
  extend(){
    this.sending = true;
    let  payload = {id:null,contract_id:this.contract_id, extention_date:this.extention_date.value}
    if(this.extention_date.value){
      this.crudService.post(payload,'contract/contractExtension').subscribe((res: any) => {
       
        if(res.status){
          this.sending = false;
          this.toastr.success(res.message);
        }else{
          this.sending = false;
          this.toastr.error(res.message);
        }
        
      })
    }
  }
  onDateSelected(date){
    this.disableDate = false;
   this.deadline = new Date(date.value)
  }
  Submit($evt){

    let payload = this.formGroup.value;
    payload.attachment = this.attachment_url;
    let date = new Date(payload.date);
    payload.date = date;
    if(this.formGroup.valid){
    this.formSubmitted = true;
     this.crudService.submit(payload,'contract/contractItem',null,$evt,this.formGroup);
    }
    else{
      this.formSubmitted = true;
    }
  }
}
