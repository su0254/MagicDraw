import { Component, ViewChild } from "@angular/core"
import { type BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import type { Observable } from "rxjs"
import { map, shareReplay } from "rxjs/operators"
import type { MatSidenav } from "@angular/material/sidenav"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"
import type { ThemeService } from "../../services/theme.service"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  @ViewChild("sidenav") sidenav: MatSidenav

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  )

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
  ) {}

  toggleSidenav(): void {
    this.sidenav.toggle()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
