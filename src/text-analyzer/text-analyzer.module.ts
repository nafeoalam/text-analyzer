import { Module } from '@nestjs/common';
import { TextAnalyzerService } from './text-analyzer.service';
import { TextAnalyzerController } from './text-analyzer.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [TextAnalyzerService, DatabaseService],
  controllers: [TextAnalyzerController]
})
export class TextAnalyzerModule {}
