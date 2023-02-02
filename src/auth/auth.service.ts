import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/users/schemas/users.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashHelper } from 'src/helper/module.helper';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private hashService: HashHelper,
    private jtwService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.validateUsername(username);
    const password = await this.hashService.comparePass(pass, user.password);
    if (user && password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jtwService.sign(payload),
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
