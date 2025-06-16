import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { encrypt, decrypt } from '../utils/encryption';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      Password: encrypt(createUserDto.password),
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(UID: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { UID } });
    if (!user) {
      throw new NotFoundException(`User with ID ${UID} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { Email: email } });
  }

  async update(UID: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(UID);
    
    // If password is being updated, encrypt it
    if (updateUserDto.Password) {
      updateUserDto.Password = await bcrypt.hash(updateUserDto.Password, 10);
    }
    
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(UID: number): Promise<void> {
    const user = await this.findOne(UID);
    await this.userRepository.remove(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { Email: loginUserDto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const decryptedPassword = decrypt(user.Password);
    if (loginUserDto.password !== decryptedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
} 