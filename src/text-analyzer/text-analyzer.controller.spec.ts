import { Test, TestingModule } from '@nestjs/testing';
import { TextAnalyzerController } from './text-analyzer.controller';
import { TextAnalyzerService } from './text-analyzer.service';

describe('TextAnalyzerController', () => {
  let controller: TextAnalyzerController;
  let service: TextAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextAnalyzerController],
      providers: [
        {
          provide: TextAnalyzerService,
          useValue: {
            readFile: jest
              .fn()
              .mockResolvedValue('Example text with multiple words.'),
            getWordCount: jest.fn().mockReturnValue(5),
            getCharacterCount: jest.fn().mockReturnValue(20),
            getSentenceCount: jest.fn().mockReturnValue(1),
            getParagraphCount: jest.fn().mockReturnValue(1),
            getLongestWords: jest.fn().mockReturnValue(['Example']),
          },
        },
      ],
    }).compile();

    controller = module.get<TextAnalyzerController>(TextAnalyzerController);
    service = module.get<TextAnalyzerService>(TextAnalyzerService);
  });

  it('should return word count', async () => {
    // Mock the expected behavior
    const filePath = 'sample.txt'; // Define the file path as a string
    jest
      .spyOn(service, 'readFile')
      .mockResolvedValue('The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.');
    jest.spyOn(service, 'getWordCount').mockReturnValue(16);

    // Call the controller method with the file path directly
    const result = await controller.getWordCountFromFile(filePath);

    // Check if the results are as expected
    expect(result).toEqual({ words: 16 });
    expect(service.readFile).toHaveBeenCalledWith(filePath);
    expect(service.getWordCount).toHaveBeenCalled();
  });

  it('should return character count', async () => {
    const filePath = 'sample.txt';
    jest.spyOn(service, 'readFile').mockResolvedValue('The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.');
    jest.spyOn(service, 'getCharacterCount').mockReturnValue(12);

    const result = await controller.getCharacterCountFromFile(filePath);

    expect(result).toEqual({ characters: 12 });
    expect(service.readFile).toHaveBeenCalledWith(filePath);
    expect(service.getCharacterCount).toHaveBeenCalled();
  });

  it('should return sentence count', async () => {
    const filePath = 'sample.txt';
    jest
      .spyOn(service, 'readFile')
      .mockResolvedValue('The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.');
    jest.spyOn(service, 'getSentenceCount').mockReturnValue(3);

    const result = await controller.getSentenceCountFromFile(filePath);

    expect(result).toEqual({ sentences: 3 });
    expect(service.readFile).toHaveBeenCalledWith(filePath);
    expect(service.getSentenceCount).toHaveBeenCalled();
  });

  it('should return paragraph count', async () => {
    const filePath = 'sample.txt';
    jest
      .spyOn(service, 'readFile')
      .mockResolvedValue('Hello.\n\nHow are you?\n\nGood, thanks!');
    jest.spyOn(service, 'getParagraphCount').mockReturnValue(3);

    const result = await controller.getParagraphCountFromFile(filePath);

    expect(result).toEqual({ paragraphs: 3 });
    expect(service.readFile).toHaveBeenCalledWith(filePath);
    expect(service.getParagraphCount).toHaveBeenCalled();
  });

  it('should return longest words from each paragraph', async () => {
    const filePath = 'sample.txt';
    jest
      .spyOn(service, 'readFile')
      .mockResolvedValue('The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.');
    jest
      .spyOn(service, 'getLongestWords')
      .mockReturnValue(['world', 'paradise']);

    const result = await controller.getLongestWordsFromFile(filePath);

    expect(result).toEqual({ longestWords: ['world', 'paradise'] });
    expect(service.readFile).toHaveBeenCalledWith(filePath);
    expect(service.getLongestWords).toHaveBeenCalled();
  });
});
