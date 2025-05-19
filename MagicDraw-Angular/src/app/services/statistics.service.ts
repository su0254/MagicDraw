import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import type { StatisticsSummary, CategoryUsage, TimeframeData } from "../models/statistics.model"

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStatisticsSummary(): Observable<StatisticsSummary> {
    return this.http.get<StatisticsSummary>(`${environment.apiUrl}/statistics/summary`)
  }

  getCategoryUsage(): Observable<CategoryUsage[]> {
    return this.http.get<CategoryUsage[]>(`${environment.apiUrl}/statistics/categories`)
  }

  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/statistics/users`)
  }

  getDrawingStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/statistics/drawings`)
  }

  getTimeframeData(timeframe: string): Observable<TimeframeData> {
    return this.http.get<TimeframeData>(`${environment.apiUrl}/statistics/timeframe/${timeframe}`)
  }
}
