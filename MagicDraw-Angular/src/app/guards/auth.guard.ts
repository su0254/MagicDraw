import { Injectable } from "@angular/core"
import type { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import type { AuthService } from "../services/auth.service"
import type { Observable } from "rxjs"
import { map, take } from "rxjs/operators"

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
