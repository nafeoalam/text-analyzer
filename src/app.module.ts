import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextAnalyzerModule } from './text-analyzer/text-analyzer.module';

@Module({
  imports: [TextAnalyzerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
