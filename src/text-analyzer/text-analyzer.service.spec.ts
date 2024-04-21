import { Test, TestingModule } from '@nestjs/testing';
import { TextAnalyzerService } from './text-analyzer.service';
import { promises as fs } from 'fs';
import { DatabaseService } from '../database/database.service';

jest.mock('fs', () => ({
  promises: {
    readFile: jest
      .fn()
      .mockResolvedValue(
        'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
      ),
  },
}));

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextAnalyzerService, DatabaseService],
    }).compile();

    service = module.get<TextAnalyzerService>(TextAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read file and return its content', async () => {
    const filePath = 'sample.txt';
    const content = await service.readFile(filePath);
    expect(content).toEqual(
      'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
    );
    expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf-8');
  });

  it('should count words correctly', async () => {
    const text = 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';
    const count = service.getWordCount(text);
    expect(count).toEqual(16);
  });

  it('should count characters correctly', async () => {
    const text = 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';
    const count = service.getCharacterCount(text);
    expect(count).toEqual(60);
  });

  it('should count sentences correctly', async () => {
    const text = 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';
    const count = service.getSentenceCount(text);
    expect(count).toEqual(2);
  });

  it('should count paragraphs correctly', async () => {
    const text = 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';
    const count = service.getParagraphCount(text);
    expect(count).toEqual(1);
  });

  it('should find the longest word in each paragraph', async () => {
    const text = 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';
    const longestWords = service.getLongestWords(text);
    expect(longestWords).toEqual(['quick']);
  });

  it('should find the longest word in each paragraph, ignoring punctuation and case', () => {
    const text =
      'Hello. How are you?\n\nAnother paragraph with more words. Reallylongwordattheend.';
    expect(service.getLongestWords(text)).toEqual([
      'Hello',
      'Reallylongwordattheend',
    ]);
  });
});
