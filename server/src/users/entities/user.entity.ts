import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => [Task], { nullable: true })
  tasks?: [Task] | null;
}
