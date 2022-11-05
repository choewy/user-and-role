import { Injectable } from '@nestjs/common';
import { BcryptService, JwtService } from '@/common';
import { User } from '@/entities';
import { AuthRepository } from './auth.repository';
import { AuthError } from './errors';
import { TokensRo } from './ros';
import { AuthPolicyDto, AuthRo, AuthRoleDto } from './ros/auth.ro';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcrypt: BcryptService,
    private readonly jwt: JwtService,
    private readonly repository: AuthRepository,
  ) {}

  async getUser(id: number): Promise<AuthRo> {
    const user = await this.repository.findUserById(id);

    if (!user) {
      AuthError.NotFoundUser.throw();
    }

    const ro = new AuthRo();
    ro.id = user.id;
    ro.account = user.account;
    ro.name = user.name;
    ro.createdAt = user.createdAt;

    ro.roles = user.roles.map(({ role }) => {
      const ro = new AuthRoleDto();
      ro.id = role.id;
      ro.name = role.name;

      ro.policies = role.policies.map((policy) => {
        const ro = new AuthPolicyDto();
        ro.policyKey = policy.policyKey;
        ro.isApply = policy.isApply;

        return ro;
      });

      return ro;
    });

    return ro;
  }

  async checkUser(account: string, password: string): Promise<TokensRo> {
    const user = await this.repository.findUserByAccount(account);

    if (!user) {
      AuthError.NotFoundUser.throw();
    }

    if (!this.bcrypt.compare(password, user.password)) {
      AuthError.IncorrectPassword.throw();
    }

    const ro = new TokensRo();
    ro.accessToken = this.jwt.issueAccessToken({ id: user.id });
    ro.refreshToken = this.jwt.issueRefreshToken();

    return ro;
  }

  async createUser(
    account: string,
    password: string,
    confirmPassword: string,
    name: string,
  ): Promise<TokensRo> {
    if (password !== confirmPassword) {
      AuthError.IncorrectPassword.throw();
    }

    if (await this.repository.findUserByAccount(account)) {
      AuthError.AlreadyUsedAccount.throw();
    }

    const user = new User();
    user.account = account;
    user.password = password;
    user.name = name;

    const id = await this.repository.insertUser(user);

    const ro = new TokensRo();
    ro.accessToken = this.jwt.issueAccessToken({ id });
    ro.refreshToken = this.jwt.issueRefreshToken();

    return ro;
  }
}
