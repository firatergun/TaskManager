import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { PrismaService } from 'src/prisma.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private prismaService: PrismaService,
  ) {}

  @ResolveField()
  async owner(@Root() task: Task) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: task.ownerId,
      },
    });
    // TODO remove password from user object !...
    return user;
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @CurrentUser() user,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ) {
    console.log('createTask....');
    console.log(createTaskInput);
    return await this.tasksService.create(createTaskInput, user);
  }

  @Query(() => [Task], { name: 'tasks' })
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: User) {
    console.log('findAll....');
    return await this.tasksService.findAll(user);
  }

  @Mutation(() => Task, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async toggleCompleted(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task | null> {
    console.log('toggleCompleted....');
    return await this.tasksService.toggleCompleted(id);
  }

  @Query(() => Task, { name: 'task' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    console.log('findOne....');
    return await this.tasksService.findOne(id);
  }

  @Query(() => [Task])
  @UseGuards(JwtAuthGuard)
  async search(
    @Args('searchString', { nullable: true }) searchString: string,
    @CurrentUser() user: User,
  ) {
    console.log('search....');
    return await this.tasksService.search(searchString, user);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @CurrentUser() user: User,
  ) {
    console.log('updateTask....');
    return await this.tasksService.update(updateTaskInput, user);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  async removeTask(@Args('id', { type: () => Int }) id: number) {
    console.log('removeTask....');
    return await this.tasksService.remove(id);
  }
}
