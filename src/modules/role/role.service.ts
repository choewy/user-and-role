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

  async updateRole(id: number, name: string): Promise<void> {
    if (id <= 3) {
      RoleError.CannotUpdateRole.throw();
    }

    if (!(await this.repository.findRoleById(id))) {
      RoleError.NotFoundRole.throw();
    }

    return this.repository.updateRole(id, name);
  }

  async updateRolePolicy(id: number, key: string, isApply: boolean) {
    if (id <= 3) {
      RoleError.CannotUpdateRole.throw();
    }

    if (!(await this.repository.findRoleById(id))) {
      RoleError.NotFoundRole.throw();
    }

    if (!(await this.repository.findPolicyByKey(key))) {
      RoleError.NotFoundPolicy.throw();
    }

    return this.repository.updateRolePolicy(id, key, isApply);
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
}
