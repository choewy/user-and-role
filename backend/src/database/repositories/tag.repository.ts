import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(
    @Inject('TAG_REPOSITORY') private readonly repository: Repository<Tag>,
  ) {}

  async getAllTags() {
    return this.repository.createQueryBuilder('tags').select().getMany();
  }
}
