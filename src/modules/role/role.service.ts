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

  async deleteRole(id: number): Promise<void> {
    if (id <= 3) {
      RoleError.CannotDeleteRole.throw();
    }

    const role = await this.repository.findRoleById(id);

    if (!role) {
      RoleError.NotFoundRole.throw();
    }

    return this.repository.deleteRole(id);
  }
}
