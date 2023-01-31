import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HashHelper } from 'src/helper/module.helper';
import { User, UserDocument } from './schemas/users.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private hashService: HashHelper,
  ) {}

  async register(createUserDto: CreateUserDto) {
    //validate DTO
    const registUser = new this.UserModel(createUserDto);

    //hash password
    registUser.password = await this.hashService.hashPassword(
      registUser.password,
    );

    return registUser.save();
  }
}
