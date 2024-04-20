import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class TextAnalyzerService {
  async readFile(filePath: string): Promise<string> {
    try {
      const text = await fs.readFile(filePath, 'utf-8');
      return text;
    } catch (error) {
      throw new Error('Error reading file: ' + error.message);
    }
  }
  analyzeText(text: string): any {
    return {
      words: this.getWordCount(text),
      characters: this.getCharacterCount(text),
      sentences: this.getSentenceCount(text),
      paragraphs: this.getParagraphCount(text),
      longestWords: this.getLongestWords(text),
    };
  }

  getWordCount(text: string): number {
    return text.match(/\w+/g)?.length || 0;
  }

  getCharacterCount(text: string): number {
    return text.replace(/\s+/g, '').length;
  }

  getSentenceCount(text: string): number {
    return text.split(/[.!?]+/).filter((sentence) => sentence.trim()).length;
  }

  getParagraphCount(text: string): number {
    return text.split(/\n+/).filter((paragraph) => paragraph.trim()).length;
  }

  getLongestWords(text: string): string[] {
    return text
      .split(/\n+/)
      .map(
        (paragraph) =>
          paragraph.match(/\w+/g)?.sort((a, b) => b.length - a.length)[0],
      );
  }
}
