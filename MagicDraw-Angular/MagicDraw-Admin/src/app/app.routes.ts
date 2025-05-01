import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { UserComponent } from '../components/users/user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: HomeComponent },
    {path:'users',component:UserComponent}
    // { path: 'updateUser', component: UpdateUserComponent },
];
