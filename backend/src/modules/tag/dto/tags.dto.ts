import { Tag } from 'src/database/entities/tag.entity';

interface TagDto {
  tagId: string;
  tag: string;
}

export class TagsDto {
  tags: TagDto[];
  constructor(tagEntities: Tag[]) {
    this.tags = tagEntities.map((tag) => ({ ...tag }));
  }
}
