import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(protected readonly userService: UserService) {}

  @Query()
  users() {
    return this.userService.findAll();
  }
}

