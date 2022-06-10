import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicListComponent } from 'featured/dynamic-list/dynamic-list.component';
import { T } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class CrudOperationService extends ApiService {
  public navObject: any;
  public dashboardRequest = false;
  public sending = false;
  public disabled:boolean = false;
  public lookup_data: any = {};
  constructor(
    http: HttpClient,
    private toastr: ToastrService,
    private location: Location,
    private router: Router,

  ) {
    super(http);
    this.toastr.toastrConfig.enableHtml = true;

  }

  submit(payload: any, endPoint: string, redirect_url: any = null, reset = false, FG: FormGroup = null,lookup = null) {
    this.sending = true;
     this.disabled = true;
    this.post(payload, endPoint,lookup).subscribe((res: any) => {
      if (res.status){
        if (redirect_url){
          this.router.navigateByUrl(redirect_url);

        } else {
          this.toastr.success(res.message, 'Success');
          reset ? FG.reset() : this.location.back();
        }

      } else {
        this.toastr.error(res.message, 'Error');

      }

      this.sending = false;

      },
      (res: any) => {
        this.sending = false;
        this.disabled = false;
        this.toastr.error(res.message, 'Error');
      }
    );
  }

  deleteRow(endpoint: string, data: any, com: DynamicListComponent): any {
   
      this.delete(data, endpoint).subscribe((res: any) => {
          if (res.status) {
            com.feedGrid(com.dataApiUrl);
            this.toastr.success(res.message, 'Success');

          } else {
            this.toastr.info(res.message, 'Error');
          }

          com.ejDialog.hide();
        },
        () => {
          this.toastr.error(
            'Unknown error ocurred, please check your connection!',
            'Error'
          );
        }
      );

  }

  detailRow(endpoint: string, id: any): any {
      this.detail(id, endpoint).subscribe(
        (res: any) => {

          return res;
        },
        () => {
          this.toastr.error(
            'Unknown error ocurred, please check your connection!',
            'Error'
          );
        }
      );

  }

  navigate(endpoint: any) {
    if (typeof endpoint === 'object') {
      this.router.navigate([`${location.pathname}/${endpoint.id}/update`]);
    } else { this.router.navigate([endpoint]); }
  }

  back() {
    this.location.back();
  }

  regenerateData(data: any, fields: string[]) {
    if (data.length) {
      data.forEach((e: any) => {
        fields.forEach(el => {
          e[el] = +e[el];
        });
      });
    }
  }

  public getControl(formGroup: FormGroup, name: any): FormControl {
    return formGroup.get(name) as FormControl;
  }
  public convertInputToNumber(value: any): boolean{
    const charCode = (value.which) ? value.which : value.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
    return true;
  }
  load_lookup(payload, reset_key = null, control: FormControl = null, actual_value = null){
    this.lookup_data[reset_key] = [];
    this.post(payload, 'util/lookup/filter').subscribe((data: any) => {
      if (data.statusCode === 200){
        this.lookup_data[payload.lookup_type] = data.data;
        control ? control.setValue(actual_value) : null;

      }
    });
  }
  setCookie(value) {
    window.localStorage.setItem("userInfo",value)
   }
   deleteCookie() {
     localStorage.clear();
 }
  getCookie(name) {
   return localStorage.getItem(name);
 }
}
