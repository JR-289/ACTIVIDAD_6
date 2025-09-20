import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterOutlet, NgxSonnerToaster],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
