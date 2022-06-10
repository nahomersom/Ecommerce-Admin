import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit , OnDestroy{
  public formGroup: FormGroup;
  public formSubmitted = false;
  public id: any;
  resId: any = 1;
  public languages:any[] = [];

  public disable: boolean = false;
  public fields: any = { text: 'value', value: 'value' };
  selectedLanguage: any;

  constructor(public crudService: CrudOperationService,public actRoute: ActivatedRoute, public httpCancelService:HttpCancelService,
   private toastr: ToastrService,) {
    this.formGroup = new FormGroup({
      language : new FormControl(null, Validators.required),
      keys : new FormArray([], Validators.required),
    });
  }

  ngOnInit() {    
    this.load_language();
     
    this.id = this.actRoute.snapshot.paramMap.get('id');

    if(this.id !== null){
      this.crudService.detail(this.id, 'util/language/detail').subscribe((res: any) => {
        let data:any = res.data[0];
        this.add(data);
        this.formGroup.get('language').disable();
        this.load_language(data.language);

      },() => {
        this.toastr.error(
          'Unknown error ocurred, please check your connection!',
          'Error'
        );
      });

    }



  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }

  Submit($evt){
    this.formSubmitted = true;

    if(this.formGroup.valid){

      this.GA().value.forEach((ele) => {
        delete ele.key;
        ele.language = this.formGroup.get('language').value;
      });
      let payload = {id : this.resId,data: this.GA().value}
      this.crudService.submit(payload, 'util/language', null, $evt, this.formGroup);

    } else{
      this.formSubmitted = true;

    }
  
  }

  public GA(): FormArray {
    return this.formGroup.get('keys') as FormArray;
  }

  public GG(index): FormGroup {
    return this.GA().controls[index] as FormGroup;
  }

  public add(data){
    this.GA().push(
      new FormGroup({ 
        id: new FormControl(data.id),
        key_id: new FormControl(data.key_id),
        key: new FormControl(data.key, Validators.required),
        value: new FormControl(data.value, Validators.required),
    })); 

  }


  load_keys(value){
    this.selectedLanguage = `Type your translation by ${value} language here ...`;
    this.GA().clear();

    this.crudService.list(`util/language/load_keys/${value}`).subscribe((res: any) => {
      if(!res.data[0].value){
        this.resId = null;    
      }
      res.data.forEach((ele) => {  this.add(ele); });
    });

  }

  load_language(value = null){
    let payload = { lookup_type: 'language', project_type:null};
        
    this.crudService.post(payload,'Util/Lookup/filter',true).subscribe((res: any) => {
      this.languages = res.data;
      this.formGroup.get('language').setValue(value);

    });

  }
}
