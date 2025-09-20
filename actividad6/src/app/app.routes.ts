import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { Error404Component } from './pages/error404/error404.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
{path: "", pathMatch: "full", redirectTo: "home"},
{path: "home", component: HomeComponent},
{path: "dashboard", component: DashboardComponent, children: [
    {path: "", pathMatch: "full", redirectTo: 'userList' },
    {path: "userList", component: UserListComponent},
    {path: "updateUser/:_id", component: NewUserComponent},
    {path: "newUser", component: NewUserComponent},
    {path: "users/:_id", component: UserInfoComponent},]
 },


{path: "**", component: Error404Component}


];
