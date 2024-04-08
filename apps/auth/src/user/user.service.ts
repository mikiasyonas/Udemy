import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcryptjs.genSalt(10);
      const password = await bcryptjs.hash(createUserDto.password, salt);
      const user = await this.userRepository.create({
        ...createUserDto,
        password,
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    const users = await this.userRepository.find({});

    return {
      count: users.length,
      data: users,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.find({ _id: id });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.upsert(
      { _id: id },
      updateUserDto,
    );

    return updatedUser;
  }

  remove(id: string) {
    return this.userRepository.findOneAndDelete({ _id: id });
  }
}
