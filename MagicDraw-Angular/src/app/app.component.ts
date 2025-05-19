import { Component } from "@angular/core"
import type { ThemeService } from "./services/theme.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "MagicDraw Admin"

  constructor(public themeService: ThemeService) {}
}
