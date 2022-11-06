import { PolicyKey, RoleAndPolicies, User } from '@/entities';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { RoleError } from './errors';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<Request>();
    const id = request['user'].id as number;

    const user = await this.dataSource.getRepository(User).findOne({
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

    if (!user) {
      RoleError.NotFoundUser.throw();
    }

    let policies: RoleAndPolicies[] = [];

    user.roles
      .map((role) => role.role.policies)
      .forEach((rolePolicies) => {
        policies = policies.concat(rolePolicies);
      });

    let pass: boolean;

    this.reflector
      .get<PolicyKey[]>('policies', ctx.getHandler())
      .forEach((key) => {
        if (policies.find(({ policyKey }) => policyKey === key)) {
          pass = true;
          return;
        }
      });

    return pass;
  }
}
