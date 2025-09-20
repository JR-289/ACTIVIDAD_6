import { Component } from '@angular/core';

import { UserListComponent } from '../user-list/user-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NavComponent } from '../../shared/nav/nav.component';
import { LoginNavComponent } from "../../shared/login-nav/login-nav.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, LoginNavComponent, LoginNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
