import { Component } from '@angular/core';
import { PdfStateService } from '../../../services/pdf-state.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true
})
export class ChatComponent {
  messages: { text: string }[] = [];
  userInput = '';

  constructor(private pdfStateService: PdfStateService) {}

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const message = this.userInput.trim();
    this.messages.push({ text: message });

    // Simulate a response that includes a reference
    if (message.toLowerCase().includes('citation') || message.includes('page')) {
      // Let's say page 3 is referenced (you can write a proper parser later)
      const pageToGo = 3;
      this.pdfStateService.setPage(pageToGo);
      this.messages.push({ text: `🔗 Cited content on page ${pageToGo}` });
    }

    this.userInput = '';
  }
}
