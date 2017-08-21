import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdProgressSpinnerModule, MdRadioModule, MdSelectModule, MdSnackBarModule, MdAutocompleteModule, MdTooltipModule } from '@angular/material';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { routing } from './app.routing';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AlertService, UserService, ApplicationService, AuthenticationService, AnnouncementService, ExecService } from './services/index';
import { ApplicationComponent } from './application/application.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { JudgeApplicationComponent } from './judge-application/judge-application.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CheckinComponent } from './checkin/checkin.component';
import { LandingComponent } from './landing/landing.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ApplicationComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent,
    JudgeApplicationComponent,
    AnnouncementsComponent,
    ApplicationsComponent,
    AnnouncementComponent,
    CheckinComponent,
    LandingComponent,
    ConfirmEmailComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    CustomFormsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSnackBarModule,
    MdAutocompleteModule,
    MdTooltipModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ApplicationService,
    AnnouncementService,
    ExecService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
