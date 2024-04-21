import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class TextAnalyzerService {
  constructor(private databaseService: DatabaseService) {}

  async addResult(
    fileName: string,
    wordCount: number,
    characterCount: number,
    paragraphCount: number,
    longestWords: string[],
  ) {
    const query = `
      INSERT INTO analysis_results (file_name, word_count, character_count, paragraph_count, longest_words)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const formattedArray = `{${longestWords.join(',')}}`; // Formats for PostgreSQL
    const values = [
      fileName,
      wordCount,
      characterCount,
      paragraphCount,
      formattedArray,
    ];

    return this.databaseService.query(query, values);
  }

  async getAllResults() {
    const query = 'SELECT * FROM analysis_results;';
    return this.databaseService.query(query);
  }

  async readFile(filePath: string): Promise<string> {
    try {
      const text = await fs.readFile(filePath, 'utf-8');
      return text;
    } catch (error) {
      throw new Error('Error reading file: ' + error.message);
    }
  }
  async analyzeText(text: string, fileName: string): Promise<any> {
    const payload = {
      fileName: fileName,
      wordCount: this.getWordCount(text),
      characterCount: this.getCharacterCount(text),
      paragraphCount: this.getParagraphCount(text),
      longestWords: this.getLongestWords(text),
    };
    const result = await this.addResult(
      payload.fileName,
      payload.wordCount,
      payload.characterCount,
      payload.paragraphCount,
      payload.longestWords,
    );
    return result;
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
