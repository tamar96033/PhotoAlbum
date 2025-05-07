import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [ 
    { path:'login', component: LoginComponent },
    { path: '', component: HomePageComponent },
    {path: 'users', component: UserListComponent}
];
