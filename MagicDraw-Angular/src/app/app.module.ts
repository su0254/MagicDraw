import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"

// Material Modules
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from "@angular/material/list"
import { MatCardModule } from "@angular/material/card"
import { MatGridListModule } from "@angular/material/grid-list"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatBadgeModule } from "@angular/material/badge"
import { MatTabsModule } from "@angular/material/tabs"
import { MatMenuModule } from "@angular/material/menu"
import { MatDialogModule } from "@angular/material/dialog"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDividerModule } from "@angular/material/divider"
import { MatButtonToggleModule } from "@angular/material/button-toggle"

// Components
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { UsersComponent } from "./pages/users/users.component"
import { StatisticsComponent } from "./pages/statistics/statistics.component"
import { DrawingsComponent } from "./pages/drawings/drawings.component"
import { CategoriesComponent } from "./pages/categories/categories.component"
import { LoginComponent } from "./pages/login/login.component"
import { NavbarComponent } from "./components/navbar/navbar.component"
import { FooterComponent } from "./components/footer/footer.component"
import { StatCardComponent } from "./components/stat-card/stat-card.component"
import { RecentDrawingsComponent } from "./components/recent-drawings/recent-drawings.component"
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component"
import { AddCategoryDialogComponent } from "./components/add-category-dialog/add-category-dialog.component"
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component"

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    StatisticsComponent,
    DrawingsComponent,
    CategoriesComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    StatCardComponent,
    RecentDrawingsComponent,
    PopularCategoriesComponent,
    AddCategoryDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
