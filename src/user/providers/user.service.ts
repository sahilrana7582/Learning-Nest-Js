import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: User): Promise<User | null> {
    const userToUpdate = await this.findOne(id);
    if (!userToUpdate) {
      return null;
    }
    Object.assign(userToUpdate, user);
    return this.usersRepository.save(userToUpdate);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createMany(users: User[]): Promise<User[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdUsers: User[] = [];

      for (const user of users) {
        const newUser = await queryRunner.manager.save(User, user);
        createdUsers.push(newUser);
      }

      await queryRunner.commitTransaction();
      return createdUsers;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Failed to create users: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }
}
