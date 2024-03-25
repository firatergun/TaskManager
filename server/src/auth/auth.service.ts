import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dto/signup.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('.........');
    const user = await this.usersService.findOneByEmail(email);
    const valid = await bcrypt.compare(password, user.password);
    if (user && valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(signUpInput: SignUpInput) {
    const user = await this.usersService.findOneByEmail(signUpInput.email);
    if (user) {
      throw new Error('Invalid credentials');
    }
    // Create hashed password
    const password = await bcrypt.hash(signUpInput.password, 10);

    // Todo Create user
    const newUser = await this.usersService.create({
      ...signUpInput,
      password,
    });
    return newUser;
  }
}
