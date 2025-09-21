import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginNavComponent } from "../../shared/login-nav/login-nav.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, LoginNavComponent, LoginNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
