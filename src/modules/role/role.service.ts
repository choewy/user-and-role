import { Injectable } from '@nestjs/common';
import { RoleError } from './errors';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async createRole(name: string): Promise<void> {
    if (await this.repository.findRoleByName(name)) {
      RoleError.AlreadyExistRole.throw();
    }

    return this.repository.insertRole(name);
  }

  async deleteRole(id: number): Promise<void> {
    if (id <= 3) {
      RoleError.CannotDeleteRole.throw();
    }

    if (!(await this.repository.findRoleById(id))) {
      RoleError.NotFoundRole.throw();
    }

    return this.repository.deleteRole(id);
  }

  async updateRole(id: number, name: string): Promise<void> {
    if (id <= 3) {
      RoleError.CannotUpdateRole.throw();
    }

    if (!(await this.repository.findRoleById(id))) {
      RoleError.NotFoundRole.throw();
    }

    return this.repository.updateRole(id, name);
  }
}
