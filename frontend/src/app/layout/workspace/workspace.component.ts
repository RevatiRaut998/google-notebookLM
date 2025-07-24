import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { PdfComponent } from './pdf/pdf.component'; 
import { PdfViewerModule } from 'ng2-pdf-viewer';    

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    ChatComponent,
    PdfComponent,
    PdfViewerModule         
  ],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {}
