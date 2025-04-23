import { Component, EventEmitter, Output } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { MatToolbar } from "@angular/material/toolbar"
import { MatIcon } from "@angular/material/icon"
import { MatMenu } from "@angular/material/menu"
import { MatDivider } from "@angular/material/divider"

@Component({
  selector: "app-header",
  imports: [MatToolbar, MatIcon, MatMenu, MatDivider],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>()

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout()
  }

  navigateTo(route: string) {
    this.router.navigate([route])
  }
}
