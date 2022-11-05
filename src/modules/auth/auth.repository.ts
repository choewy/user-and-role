import { PolicyKey, Role, User, UserAndRoles } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  private readonly userRepository: Repository<User>;
  private readonly roleRepository: Repository<Role>;
  private readonly userAndRolesRepository: Repository<UserAndRoles>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
    this.roleRepository = this.dataSource.getRepository(Role);
    this.userAndRolesRepository = this.dataSource.getRepository(UserAndRoles);
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({
      relations: {
        roles: {
          role: {
            policies: true,
          },
        },
      },
      where: {
        id,
        roles: {
          role: {
            policies: {
              isApply: true,
            },
          },
        },
      },
    });
  }

  async findUserByAccount(account: string) {
    return this.userRepository.findOne({
      where: { account },
    });
  }

  async insertUser(user: Partial<User>): Promise<number> {
    let id: number;

    await this.dataSource.transaction(async () => {
      const role = await this.roleRepository.findOne({
        relations: { policies: true },
        where: {
          policies: {
            policyKey: PolicyKey.Empty,
            isApply: true,
          },
        },
      });

      const { identifiers } = await this.userRepository.insert(user);
      id = identifiers[0].id;

      await this.userAndRolesRepository.insert({
        userId: id,
        roleId: role.id,
      });
    });

    return id;
  }
}
