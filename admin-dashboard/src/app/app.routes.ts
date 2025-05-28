import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [ 
    // { path:'', component: LoginComponent },
    // // { path: '', component: HomePageComponent },
    // // {path: 'users', component: UserListComponent}

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: AdminDashboardComponent }
];
