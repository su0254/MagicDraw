import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../components/footer/footer.component"
import { NavbarComponent } from "../components/navbar/navbar.component"
import { ThemeService } from "../services/theme.service"
import { LoginComponent } from "../pages/login/login.component"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, LoginComponent],
})
export class AppComponent {
  title = "MagicDraw Admin"

  constructor(public themeService: ThemeService) {}
}
