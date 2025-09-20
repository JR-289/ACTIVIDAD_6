import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FootersComponent } from './shared/footers/footers.component';
import { NgxSonnerToaster } from 'ngx-sonner';


@Component({
  selector: 'app-root',
  imports: [NavComponent, ReactiveFormsModule, FootersComponent, RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.html' ,
  styleUrl: './app.css'
})
export class App {
  protected title = 'actividad6';
}
