import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { feedback } from './feedback-control';

@Component({
  selector: 'app-feedback-and-complain',
  templateUrl: './feedback-and-complain.component.html',
  styleUrls: ['./feedback-and-complain.component.css']
})
export class FeedbackAndComplainComponent extends Base implements OnInit {
  id:any = undefined;
  formGroup:FormGroup;
  constructor(public crudService: CrudOperationService,public actRoute: ActivatedRoute) { 
    super(crudService);
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    if(this.id != undefined){
      this.crudService.detail(this.id,'util/feedback/detail').subscribe((res: any)=>{
        this.formGroup.patchValue(res.data)
      })
    }
  }
  createForm(): void {
    this.formGroup = this.createControls(feedback);
    }
 Submit(){

   let id = this.formGroup.get('id').value;
    let status =this.formGroup.get('status').value == false ? '0': '1'
   let payload = {status:status,id:id}
   if(this.formGroup.get('status').valid){
     this.crudService.submit(payload,'util/feedback')
   }
 }
}
