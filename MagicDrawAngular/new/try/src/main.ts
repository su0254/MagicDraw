import { enableProdMode, importProvidersFrom } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { AppComponent } from "./app/app.component"
import { environment } from "./environments/environment"
import { AppRoutingModule } from "./app/app-routing.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule, BrowserAnimationsModule, HttpClientModule)],
}).catch((err) => console.error(err))
