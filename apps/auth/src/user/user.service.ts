import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);

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
    this.logger.log(user);
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
