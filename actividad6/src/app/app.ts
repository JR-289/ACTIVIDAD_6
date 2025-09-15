import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FootersComponent } from './pages/footers/footers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, ReactiveFormsModule, FootersComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'actividad6';
}
