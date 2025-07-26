import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { PdfStateService } from '../../../services/pdf-state.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-pdf',
  standalone: true,
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  imports: [CommonModule, PdfViewerModule],
})
export class PdfComponent implements OnInit {
  @ViewChild(PdfViewerComponent) private pdfViewer?: PdfViewerComponent;

pdfSrc: SafeResourceUrl | null = null;
  isPdfLoaded = false;
  totalPages = 0;
  currentPage = 1;
  jumpPage: number = 1;

  constructor(private pdfStateService: PdfStateService,
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.pdfStateService.currentPage$.subscribe((page: number) => {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.jumpPage = page;
      }
    });
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.pdfSrc = reader.result as string;
  //       this.isPdfLoaded = true;
  //       this.currentPage = 1;
  //       this.jumpPage = 1;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

//   onFileSelected(event: any): void {
//   const file: File = event.target.files[0];
//   console.log('File selected:', file);

//   if (file && file.type === 'application/pdf') {
//     const reader = new FileReader();

//     reader.onload = () => {
//       console.log('FileReader loaded PDF');
//       const unsafeUrl = reader.result as string;
//       this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
//       this.isPdfLoaded = true;
//       this.currentPage = 1;
//       this.jumpPage = 1;
//     };

//     reader.onerror = (error) => {
//       console.error('FileReader error:', error);
//     };

//     reader.readAsDataURL(file);
//   } else {
//     console.warn('Selected file is not a PDF.');
//   }
// }

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  console.log('File selected:', file);

  if (file && file.type === 'application/pdf') {
    const reader = new FileReader();

    reader.onload = () => {
      console.log('FileReader loaded PDF');
      this.pdfSrc = reader.result as string; // 👈 Fix is here
      this.isPdfLoaded = true;
      this.currentPage = 1;
      this.jumpPage = 1;
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };

    reader.readAsDataURL(file);
  } else {
    console.warn('Selected file is not a PDF.');
  }
}


  onPdfLoaded(pdf: any): void {
    this.totalPages = pdf.numPages;
    this.isPdfLoaded = true;
    this.pdfStateService.setTotalPages(pdf.numPages);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.jumpPage = this.currentPage;
      this.pdfStateService.setCurrentPage(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.jumpPage = this.currentPage;
      this.pdfStateService.setCurrentPage(this.currentPage);
    }
  }

  onJumpPageInput(event: any): void {
    this.jumpPage = parseInt(event.target.value, 10);
  }

  isValidJumpPage(): boolean {
    return (
      this.jumpPage >= 1 &&
      this.jumpPage <= this.totalPages &&
      this.jumpPage !== this.currentPage
    );
  }

  jumpToPage(): void {
    if (this.isValidJumpPage()) {
      this.currentPage = this.jumpPage;
      this.pdfStateService.setCurrentPage(this.currentPage);
    }
  }
}
