import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from '../users/entities/user.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateTaskInput, user: User) {
    return await this.prismaService.task.create({
      data: {
        ...data,
        ownerId: user.id,
      },
    });
  }

  async findAll(user: User) {
    return await this.prismaService.task.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
  }

  async toggleCompleted(id: number) {
    const post = await this.prismaService.task.findUnique({
      where: { id: id || undefined },
      select: {
        completed: true,
      },
    });

    return this.prismaService.task.update({
      where: { id: id || undefined },
      data: { completed: !post?.completed },
    });
  }

  async update(updateTaskInput: UpdateTaskInput, user: User) {
    return await this.prismaService.task.update({
      where: {
        id: updateTaskInput.id,
        ownerId: user.id,
      },
      data: {
        ...updateTaskInput,
      },
    });
  }

  async search(searchString: string, user: User) {
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {};

    return await this.prismaService.task.findMany({
      where: {
        ownerId: user.id,
        ...or,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }
}
