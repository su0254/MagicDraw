import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from "../components/home/home.component";
import { HeaderComponent } from "../shareds/header/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MagicDraw-Admin';
}
