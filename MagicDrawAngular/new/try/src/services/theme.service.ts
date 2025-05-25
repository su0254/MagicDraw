import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false)
  isDarkTheme$: Observable<boolean> = this.isDarkThemeSubject.asObservable()

  constructor() {
    // Check if user has a theme preference stored
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      this.isDarkThemeSubject.next(storedTheme === "dark")
    } else {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      this.isDarkThemeSubject.next(prefersDark)
    }
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkThemeSubject.value
    this.isDarkThemeSubject.next(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")

    // Apply theme to document
    if (newTheme) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }
}
