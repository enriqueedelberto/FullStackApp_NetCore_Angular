import { Routes, CanActivate } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../guard/AuthGuard';
import { LoginGuard } from '../guard/LoginGuard';
import { HomeComponent } from '../home/home.component';

import { HomeDashboardComponent } from '../home-dashboard/home-dashboard.component';
import { AboutComponent } from '../about/about.component';
import { SettingsComponent } from '../settings/settings.component';
import { StudentComponent } from '../student/student.component';


// import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { StudentListComponent } from '../student/student-list/student-list.component';
import { StudentDetailComponent } from '../student/student-detail/student-detail.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        canActivate: [],
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [

                {
                    path: 'dashboard',
                    component: HomeDashboardComponent,
                    canActivate: [AuthGuard]
                },
                {
                    path: 'about',
                    component: AboutComponent,
                    canActivate: [AuthGuard]
                },
                {
                    path: 'settings',
                    component: SettingsComponent,
                    canActivate: [AuthGuard]
                },
               {
                 path: 'student',
                 component: StudentComponent,
                 canActivate: [AuthGuard],
                 children: [
                   {
                     path: 'list',
                     component: StudentListComponent
                   },
                   {
                    path: 'new',
                    component: StudentDetailComponent
                   },
                   {
                    path: 'detail/:id',
                    component: StudentDetailComponent
                   },
                   {
                     path: '',
                     redirectTo: 'list',
                     pathMatch: 'full'
                   }
                 ]
                },

        ]
    },

    {
        path: '',
        canActivate: [LoginGuard],
        component: LoginComponent
    },



];

