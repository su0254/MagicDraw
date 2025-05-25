import { Injectable } from "@angular/core"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Router } from "@angular/router"
import { Observable } from "rxjs"
import { map, take } from "rxjs/operators"
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true
        } else {
          this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } })
          return false
        }
      }),
    )
  }
}
