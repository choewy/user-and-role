import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TagProvider } from 'src/database/providers/tag.provider';
import { TagRepository } from 'src/database/repositories/tag.repository';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [DatabaseModule],
  providers: [TagProvider, TagRepository, TagService],
  controllers: [TagController],
})
export class TagModule {}
