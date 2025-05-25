import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Category } from "../models/category.model"
import { environment } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`)
  }

  getPopularCategories(limit = 5): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories/popular?limit=${limit}`)
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/categories`, category)
  }

  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}/categories/${id}`, category)
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/categories/${id}`)
  }
}
