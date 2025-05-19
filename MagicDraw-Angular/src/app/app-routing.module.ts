import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { UsersComponent } from "./pages/users/users.component"
import { StatisticsComponent } from "./pages/statistics/statistics.component"
import { DrawingsComponent } from "./pages/drawings/drawings.component"
import { CategoriesComponent } from "./pages/categories/categories.component"
import { LoginComponent } from "./pages/login/login.component"
import { AuthGuard } from "./guards/auth.guard"

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "statistics", component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: "drawings", component: DrawingsComponent, canActivate: [AuthGuard] },
  { path: "categories", component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
