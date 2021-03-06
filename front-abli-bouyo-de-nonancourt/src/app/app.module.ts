import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,

} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ChannelComponent } from './channel/channel.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { DialogComponent } from './shared/dialog/dialog.component';
import {MessageComponent} from './shared/message/message.component';
import {IsYouDirective} from './shared/directives/isyou.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ChannelComponent,
    DialogComponent,
    MessageComponent,
    IsYouDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatSidenavModule,
    FormsModule,
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
