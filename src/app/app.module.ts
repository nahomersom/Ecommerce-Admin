import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SecurityService } from '@core/security/security.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { ClientDetailComponent } from '../featured/group-and-user/client-detail/client-detail.component';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CoreModule,
    NgbModule
  ],
  providers: [
    SecurityService,
    CookieService,
    
    HttpCancelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
