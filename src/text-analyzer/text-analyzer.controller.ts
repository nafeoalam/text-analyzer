import { Controller, Get, Query } from '@nestjs/common';
import { TextAnalyzerService } from './text-analyzer.service';

@Controller('analyze')
export class TextAnalyzerController {
  constructor(private readonly textAnalyzerService: TextAnalyzerService) {}

  @Get('/words')
  async getWordCountFromFile(@Query('filePath') filePath: string) {
    const text = await this.textAnalyzerService.readFile(filePath);
    return { words: this.textAnalyzerService.getWordCount(text) };
  }

  @Get('/characters')
  async getCharacterCountFromFile(@Query('filePath') filePath: string) {
    const text = await this.textAnalyzerService.readFile(filePath);
    return { characters: this.textAnalyzerService.getCharacterCount(text) };
  }

  @Get('/sentences')
  async getSentenceCountFromFile(@Query('filePath') filePath: string) {
    const text = await this.textAnalyzerService.readFile(filePath);
    return { sentences: this.textAnalyzerService.getSentenceCount(text) };
  }

  @Get('/paragraphs')
  async getParagraphCountFromFile(@Query('filePath') filePath: string) {
    const text = await this.textAnalyzerService.readFile(filePath);
    return { paragraphs: this.textAnalyzerService.getParagraphCount(text) };
  }

  @Get('/longest-words')
  async getLongestWordsFromFile(@Query('filePath') filePath: string) {
    const text = await this.textAnalyzerService.readFile(filePath);
    return { longestWords: this.textAnalyzerService.getLongestWords(text) };
  }
}
