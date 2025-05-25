import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { StatisticsSummary, CategoryUsage, TimeframeData } from "../models/statistics.model"
import { environment } from "../environments/environment"

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
