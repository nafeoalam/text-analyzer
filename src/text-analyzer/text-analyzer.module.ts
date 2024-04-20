import { Module } from '@nestjs/common';
import { TextAnalyzerService } from './text-analyzer.service';
import { TextAnalyzerController } from './text-analyzer.controller';

@Module({
  providers: [TextAnalyzerService],
  controllers: [TextAnalyzerController]
})
export class TextAnalyzerModule {}
