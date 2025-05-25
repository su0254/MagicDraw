import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../guards/auth.guard"
import { CategoriesComponent } from "../pages/categories/categories.component"
import { DashboardComponent } from "../pages/dashboard/dashboard.component"
import { DrawingsComponent } from "../pages/drawings/drawings.component"
import { LoginComponent } from "../pages/login/login.component"
import { StatisticsComponent } from "../pages/statistics/statistics.component"
import { UsersComponent } from "../pages/users/users.component"


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
