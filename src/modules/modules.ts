import {
  InjectRowsToken,
  Policy,
  PolicyInitRows,
  Role,
  RoleAndPolicies,
  RoleInitRows,
  RoleAndPoliciesInitRows,
  User,
  UserInitRows,
  UserAndRoles,
  UserAndRolesInitRows,
} from '@/entities';
import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { AuthModule } from './auth';
import { PolicyModule } from './policy';
import { RoleModule } from './role';
import { UserModule } from './user';

@Module({
  imports: [UserModule, RoleModule, PolicyModule, AuthModule],
  providers: [
    RoleInitRows,
    PolicyInitRows,
    RoleAndPoliciesInitRows,
    UserInitRows,
    UserAndRolesInitRows,
  ],
})
export class Modules implements OnApplicationBootstrap {
  constructor(
    @Inject(InjectRowsToken.ROLES)
    private readonly roles: () => Array<Role>,

    @Inject(InjectRowsToken.POLICIES)
    private readonly policies: () => Array<Policy>,

    @Inject(InjectRowsToken.ROLE_AND_POLICIES)
    private readonly roleAndPolicies: (
      roles: Array<Role>,
      policies: Array<Policy>,
    ) => Array<RoleAndPolicies>,

    @Inject(InjectRowsToken.USERS)
    private readonly users: () => Array<User>,

    @Inject(InjectRowsToken.USER_AND_ROLES)
    private readonly userAndRoles: (
      users: Array<User>,
      roles: Array<Role>,
    ) => Array<UserAndRoles>,

    private readonly dataSource: DataSource,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      await this.initRoles(em);
      await this.initPolicies(em);
      await this.initUsers(em);

      await this.initRoleAndPolicies(em);
      await this.initUserAndRoles(em);
    });
  }

  private async initUsers(em: EntityManager) {
    const repository = em.getRepository(User);
    const rows = await repository.find();

    if (rows.length === 0) {
      const tableName = this.dataSource.getMetadata(User).givenTableName;
      await em.query(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`);
      await repository.insert(this.users());
    }
  }

  private async initRoles(em: EntityManager) {
    const repository = em.getRepository(Role);
    const rows = await repository.find();

    if (rows.length === 0) {
      const tableName = this.dataSource.getMetadata(Role).givenTableName;
      await em.query(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`);
      await repository.insert(this.roles());
    }
  }

  private async initPolicies(em: EntityManager) {
    const repository = em.getRepository(Policy);
    const rows = await repository.find();

    if (rows.length === 0) {
      await repository.insert(this.policies());
    }
  }

  private async initRoleAndPolicies(em: EntityManager) {
    const repository = em.getRepository(RoleAndPolicies);
    const rows = await repository.find();

    if (rows.length === 0) {
      await repository.insert(
        this.roleAndPolicies(this.roles(), this.policies()),
      );
    }
  }

  private async initUserAndRoles(em: EntityManager) {
    const repository = em.getRepository(UserAndRoles);
    const rows = await repository.find();

    if (rows.length === 0) {
      await repository.insert(this.userAndRoles(this.users(), this.roles()));
    }
  }
}
