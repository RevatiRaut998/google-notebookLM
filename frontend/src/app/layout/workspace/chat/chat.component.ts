import { Component } from '@angular/core';
import { PdfStateService } from '../../../services/pdf-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  userInput = '';

  constructor(private pdfStateService: PdfStateService) {}

  sendMessage(): void {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ text: input, sender: 'user' });

    // Simulate bot response after short delay
    setTimeout(() => {
      const botReply = this.generateFakeResponse(input);
      this.messages.push({ text: botReply, sender: 'ai' });
    }, 800);

    this.userInput = '';
  }

  generateFakeResponse(input: string): string {
    if (input.toLowerCase().includes('summary')) {
      return `This note discusses key points on [page 2] and [page 5].`;
    } else if (input.toLowerCase().includes('citation') || input.includes('page')) {
      return `Sure, refer to [page 3] for that detail.`;
    }
    return `I'm analyzing your document... check [page 1] for the intro.`;
  }

  formatMessage(msg: ChatMessage): string {
    // Convert [page X] to clickable HTML
    return msg.text.replace(/\[page (\d+)\]/gi, (_, page) => {
      return `<span class="citation-link" onclick="document.querySelector('app-chat')?.__ngContext__?.[8].goToPage(${page})">[page ${page}]</span>`;
    });
  }

  // Called by dynamic link
  goToPage(page: number): void {
    if (page > 0) {
      this.pdfStateService.setPage(page);
    }
  }
}
