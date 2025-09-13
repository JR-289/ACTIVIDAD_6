import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
{path: "", pathMatch: "full", redirectTo: "home"},
{path: "home", component: HomeComponent},
{path: "newUser", component: NewUserComponent},
{path: "**", component: Error404Component}


];
