import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextAnalyzerModule } from './text-analyzer/text-analyzer.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TextAnalyzerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
