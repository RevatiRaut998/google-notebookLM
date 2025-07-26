import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfStateService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  private totalPagesSubject = new BehaviorSubject<number>(0);
  totalPages$ = this.totalPagesSubject.asObservable();

  setCurrentPage(page: number): void {
    this.currentPageSubject.next(page);
  }

  setTotalPages(pages: number): void {
    this.totalPagesSubject.next(pages);
  }

  setPage(page: number): void {
    this.setCurrentPage(page); // just a convenience alias
  }
}
