import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './application/application.component';
import { JudgeApplicationComponent } from './judge-application/judge-application.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'confirmPassword', component: ConfirmPasswordComponent },
    { path: 'application', component: ApplicationComponent, canActivate: [AuthGuard] },
    { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
    { path: 'application/:id', component: JudgeApplicationComponent, canActivate: [AuthGuard] },
    { path: 'announcements', component: AnnouncementsComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
