import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { Drawing } from '../../Models/Drawing';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  private drawingsSubject = new BehaviorSubject<Drawing[]>([]);
  drawings$ = this.drawingsSubject.asObservable();
  private apiUrl = "http://localhost:5058/api/Painting";

  constructor(private http: HttpClient) {}

  // Fetch all drawings
  getAllDrawings(): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(`${this.apiUrl}`).pipe(
      tap((drawings) => {
        console.log("Fetched drawings:", drawings);
        
        
        this.drawingsSubject.next(drawings);
      }),
      catchError((error) => {
        console.error("Error fetching drawings:", error);
        return of([]);
      })
    );
  }

  // Add a new drawing
  addDrawing(drawing: Drawing): Observable<Drawing> {
    console.log("Drawing to add:", drawing);
    
    const formData = new FormData();
    formData.append('FileName', drawing.fileName);
    formData.append('CategoryName', drawing.categoryName);
    formData.append('ImageFile', drawing.imageFile);
    formData.append('UserId', localStorage.getItem('userId') || '');
    console.log("FormData:", formData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });
    
    return this.http.post<Drawing>(`${this.apiUrl}`, formData).pipe(
      tap((newDrawing) => {
        const currentDrawings = this.drawingsSubject.value;
        this.drawingsSubject.next([...currentDrawings, newDrawing]);
        
      }),
      catchError((error) => {
        console.error("Error adding drawing:", error);
        return of(null as any);
      })
    );
  }

  // Update an existing drawing
  updateDrawing(id: string, updatedDrawing: Drawing): Observable<Drawing> {
    return this.http.put<Drawing>(`${this.apiUrl}/${id}`, updatedDrawing).pipe(
      tap(() => {
        const currentDrawings = this.drawingsSubject.value.map((drawing) =>
          drawing.id === id ? { ...drawing, ...updatedDrawing } : drawing
        );
        this.drawingsSubject.next(currentDrawings);
      }),
      catchError((error) => {
        console.error("Error updating drawing:", error);
        return of(null as any);
      })
    );
  }

  // Delete a drawing
  deleteDrawing(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentDrawings = this.drawingsSubject.value.filter(
          (drawing) => drawing.id !== id
        );
        this.drawingsSubject.next(currentDrawings);
      }),
      catchError((error) => {
        console.error("Error deleting drawing:", error);
        return of();
      })
    );
  }

  getDrawingsByCategory(categoryName: string): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(`${this.apiUrl}/category/${categoryName}`).pipe(
      tap((drawings) => {
        console.log("Fetched drawings by category:", drawings);
        this.drawingsSubject.next(drawings);
      }),
      catchError((error) => {
        console.error("Error fetching drawings by category:", error);
        return of([]);
      })
    );
  }
}
