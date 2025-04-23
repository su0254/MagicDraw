import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { LoginComponent } from "../components/login/login/login.component"
import { HomeComponent } from "../components/home/home/home.component"
import { UsersComponent } from "../components/users/users/users.component"
import { DrawingsComponent } from "../components/drawings/drawings/drawings.component"
import { AuthGuard } from "../services/auth.guard"
import { CategoriesComponent } from "../components/categories/categories/categories.component"
import { StatisticsComponent } from "../components/statistics/statistics/statistics.component"

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: HomeComponent },
      { path: "users", component: UsersComponent },
      { path: "drawings", component: DrawingsComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "statistics", component: StatisticsComponent },
    ],
  },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
