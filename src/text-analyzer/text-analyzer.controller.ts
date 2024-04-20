import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TextAnalyzerService } from './text-analyzer.service';

@Controller('analyze')
export class TextAnalyzerController {
  constructor(private readonly textAnalyzerService: TextAnalyzerService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('textFile'))
  async handleFileUpload(@UploadedFile() file: Express.Multer.File) {
    // Assuming the file is plain text and needs to be converted from buffer to string
    const content = file.buffer.toString('utf-8');
    return this.textAnalyzerService.analyzeText(content);
  }

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
