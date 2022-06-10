import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { CookieEncryptionService } from '@core/utils/cookie-encryption.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public url: any = environment.baseUrl;
  constructor(public service: SecurityService, public router: Router,private http: HttpClient,private crudService:CrudOperationService,private encryptDecryptCookie:CookieEncryptionService) {
    this.get_logged_in_data();
  }
  public get_logged_in_data(){
    // this.http.get(this.url + '/util/dashboard/is_logged_in').subscribe((data: any) => {
    //   data ? this.service.securityObject = data : this.router.navigate(['/authentication/login']);
    // });
     
    if(this.crudService.getCookie('userInfo')){
  
      this.service.securityObject = JSON.parse(this.encryptDecryptCookie.decrypt(this.crudService.getCookie('userInfo')));
    }else{
      this.router.navigate(['authentication/login']);
    }
  }

 

}
