import { Component, ViewChild } from "@angular/core"
import { Observable } from "rxjs"
import { map, shareReplay } from "rxjs/operators"
import { MatSidenav } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from "@angular/material/list"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatMenuModule } from "@angular/material/menu"
import { MatDividerModule } from "@angular/material/divider"
import { Router, RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../services/auth.service"
import { ThemeService } from "../../services/theme.service"
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
  ],
})
export class NavbarComponent {
  @ViewChild("sidenav") sidenav: MatSidenav | undefined
  isHandset$!: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay(),
    );
  }

  toggleSidenav(): void {
    this.sidenav?.toggle()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
