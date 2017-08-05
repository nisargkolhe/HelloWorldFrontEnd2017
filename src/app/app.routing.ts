import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './application/application.component';
import { JudgeApplicationComponent } from './judge-application/judge-application.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CheckinComponent } from './checkin/checkin.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';


const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'confirmPassword', component: ConfirmPasswordComponent },
    { path: 'confirmEmail', component: ConfirmEmailComponent },
    { path: 'application', component: ApplicationComponent, canActivate: [AuthGuard] },
    { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'application/:id', component: JudgeApplicationComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'announcement', component: AnnouncementComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'announcements', component: AnnouncementsComponent},
    { path: 'checkin', component: CheckinComponent, canActivate: [AuthGuard, AdminGuard]},
    // otherwise redirect to landing
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
