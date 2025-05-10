import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Category } from '../../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAllCategories(): void {
    this.http.get<Category[]>('http://localhost:5058/api/Category').pipe(
      tap((categories) => {
        this.categoriesSubject.next(categories);
        this.showMessage('קטגוריות נטענו בהצלחה', 'success');
      }),
      catchError((error) => {
        this.showMessage('שגיאה בטעינת הקטגוריות', 'error');
        return of([]);
      })
    ).subscribe();
  }

  addCategory(category: Category): void {
    this.http.post('http://localhost:5058/api/Category', category).subscribe({
      next: () => {
        this.showMessage('קטגוריה נוספה בהצלחה', 'success');
        this.refreshCategories();
      },
      error: () => {
        this.showMessage('שגיאה בהוספת קטגוריה', 'error');
      }
    });
  }

  deleteCategory(categoryId: string): void {
    this.http.delete(`http://localhost:5058/api/Category/${categoryId}`).subscribe({
      next: () => {
        this.showMessage('קטגוריה נמחקה בהצלחה', 'success');
        this.refreshCategories();
      },
      error: () => {
        this.showMessage('שגיאה במחיקת קטגוריה', 'error');
      }
    });
  }

  updateCategory(categoryId: string, updatedCategory: Category): void {
    this.http.put(`http://localhost:5058/api/Category/${categoryId}`, updatedCategory).subscribe({
      next: () => {
        this.showMessage('קטגוריה עודכנה בהצלחה', 'success');
        this.refreshCategories();
      },
      error: () => {
        this.showMessage('שגיאה בעדכון קטגוריה', 'error');
      }
    });
  }

  private refreshCategories(): void {
    this.getAllCategories();
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
