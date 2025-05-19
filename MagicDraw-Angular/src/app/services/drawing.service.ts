import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import type { Drawing } from "../models/drawing.model"

@Injectable({
  providedIn: "root",
})
export class DrawingService {
  constructor(private http: HttpClient) {}

  getDrawings(): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(`${environment.apiUrl}/drawings`)
  }

  getRecentDrawings(limit = 5): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(`${environment.apiUrl}/drawings/recent?limit=${limit}`)
  }

  getDrawingById(id: string): Observable<Drawing> {
    return this.http.get<Drawing>(`${environment.apiUrl}/drawings/${id}`)
  }

  getDrawingsByCategory(categoryId: string): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(`${environment.apiUrl}/drawings/category/${categoryId}`)
  }

  createDrawing(drawing: Drawing): Observable<Drawing> {
    return this.http.post<Drawing>(`${environment.apiUrl}/drawings`, drawing)
  }

  updateDrawing(id: string, drawing: Partial<Drawing>): Observable<Drawing> {
    return this.http.put<Drawing>(`${environment.apiUrl}/drawings/${id}`, drawing)
  }

  deleteDrawing(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/drawings/${id}`)
  }

  approveDrawing(id: string): Observable<Drawing> {
    return this.http.patch<Drawing>(`${environment.apiUrl}/drawings/${id}/approve`, {})
  }

  rejectDrawing(id: string): Observable<Drawing> {
    return this.http.patch<Drawing>(`${environment.apiUrl}/drawings/${id}/reject`, {})
  }
}
