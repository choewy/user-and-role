import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserContoller {
  constructor(private readonly userService: UserService) {}
}
