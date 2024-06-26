import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Query(() => [User], { name: 'users' })
  // @UseGuards(JwtAuthGuard)
  // findAll(@Context() context) {
  //   console.log(context.user);
  //   return this.usersService.findAll();
  // }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  // @Query(() => User, { name: 'user' })
  // @UseGuards(JwtAuthGuard)
  // me(@Context() context) {
  //   console.log('ME CONTEXT:', context);
  //   // return this.usersService.findById(context.);
  // }

  // @Mutation(() => User)
  // @UseGuards(JwtAuthGuard)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
