import { Allow } from 'class-validator/decorator/decorators';
import { User } from '../user.entity';

export class ReturnUserDto {
  @Allow()
  user: User;
  message: string;
}
