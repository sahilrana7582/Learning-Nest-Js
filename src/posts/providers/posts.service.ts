import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
  ) {}

  public async createPost(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  public async findAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  public async createManyPosts(posts: Post[]): Promise<Post[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdPosts: Post[] = [];
      for (const post of posts) {
        const createdPost = await this.postRepository.save(post);
        createdPosts.push(createdPost);
      }
      await queryRunner.commitTransaction();
      return createdPosts;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Failed to create posts' + error);
    } finally {
      await queryRunner.release();
    }
  }
}
