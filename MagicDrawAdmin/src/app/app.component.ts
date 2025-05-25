import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login/login/login.component';
import { HomeComponent } from "../components/home/home/home.component";
import { HeaderComponent } from "../shareds/header/header/header.component";
import { FooterComponent } from "../shareds/footer/footer/footer.component";
import { UsersComponent } from "../components/users/users/users.component";
import { CategoriesComponent } from "../components/categories/categories/categories.component";
import { DrawingsComponent } from "../components/drawings/drawings/drawings.component";
import { CategoryDialogComponent } from "../components/categories/categories/category-dialog/category-dialog.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HomeComponent, HeaderComponent, FooterComponent, UsersComponent, CategoriesComponent, DrawingsComponent, CategoryDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MagicDraw-Admin';
}
