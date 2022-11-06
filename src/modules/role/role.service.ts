import { Injectable } from '@nestjs/common';
import { RoleError } from './errors';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async createRole(name: string): Promise<void> {
    const role = await this.repository.findRoleByName(name);

    if (role) {
      RoleError.AlreadyExistRole.throw();
    }

    return this.repository.insertRole(name);
  }
}
