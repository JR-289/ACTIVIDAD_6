import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/nav/nav.component';
import { FootersComponent } from '../../shared/footers/footers.component';


@Component({
  selector: 'app-dashboard',
  imports: [ RouterOutlet, NavComponent, FootersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
