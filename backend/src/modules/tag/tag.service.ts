import { Injectable } from '@nestjs/common';
import { TagRepository } from 'src/database/repositories/tag.repository';
import { TagsDto } from './dto/tags.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getAllTags() {
    const tags = await this.tagRepository.getAllTags();
    return new TagsDto(tags);
  }
}
