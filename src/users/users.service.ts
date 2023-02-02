import { BadRequestException, Injectable } from '@nestjs/common';
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

  async validateUsername(username: string) {
    return this.UserModel.findOne({ username }).exec();
  }

  async register(createUserDto: CreateUserDto) {
    //validate DTO
    const registUser = new this.UserModel(createUserDto);

    //checking username
    const user = await this.validateUsername(createUserDto.username);
    if (user) {
      throw new BadRequestException();
    }

    //hash password
    registUser.password = await this.hashService.hashPassword(
      registUser.password,
    );

    return registUser.save();
  }
}
