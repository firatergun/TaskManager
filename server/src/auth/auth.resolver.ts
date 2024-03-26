import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from '../users/entities/user.entity';
import { SignUpInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') input: LoginInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('signUpInput') signUpInput: SignUpInput) {
    console.log(signUpInput);
    return await this.authService.signup(signUpInput);
  }
}
