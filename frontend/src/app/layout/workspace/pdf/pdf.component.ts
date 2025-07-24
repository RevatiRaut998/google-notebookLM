import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { PdfStateService } from '../../../services/pdf-state.service';

@Component({
  selector: 'app-pdf',
  standalone: true,
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  imports: [CommonModule, PdfViewerModule], // ✅ use PdfViewerModule here
})
export class PdfComponent implements OnInit {
  @ViewChild(PdfViewerComponent) private pdfViewer?: PdfViewerComponent;

  pdfSrc: string | null = null;
  isPdfLoaded = false;
  totalPages = 0;
  currentPage = 1;

  constructor(private pdfStateService: PdfStateService) {}

  ngOnInit(): void {
    this.pdfStateService.currentPage$.subscribe((page: number) => {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pdfSrc = reader.result as string;
        this.isPdfLoaded = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onPdfLoaded(pdf: any): void {
    this.totalPages = pdf.numPages;
    this.isPdfLoaded = true;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
