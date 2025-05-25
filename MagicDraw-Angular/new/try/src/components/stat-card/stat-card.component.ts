import { Component, Input } from "@angular/core"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-stat-card",
  templateUrl: "./stat-card.component.html",
  styleUrls: ["./stat-card.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
})
export class StatCardComponent {
  @Input() title: string | undefined
  @Input() value: string | number | undefined
  @Input() description: string | undefined
  @Input() icon: string | undefined
  @Input() iconColor = "text-primary"
}
