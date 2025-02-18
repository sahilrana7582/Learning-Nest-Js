import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository, DataSource } from 'typeorm';
import { CreaetePostDto } from '../dtos/create-post.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { User } from 'src/user/entities/user.entity';
import { GetPostDto } from '../dtos/get-post-base.dto';
import { Between } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,

    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createPost(post: CreaetePostDto, id: number): Promise<Post> {
    const metaOptions = post.metaOptions
      ? this.metaOptionsRepository.create(post.metaOptions)
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const postInfo = this.postRepository.create({
      ...post,
      author: user,
    });

    if (metaOptions) {
      postInfo.metaValue = metaOptions;
    }

    return this.postRepository.save(postInfo);
  }

  public async findAllPosts(postQuery: GetPostDto): Promise<Post[]> {
    const { startDate, endDate } = postQuery;

    if (postQuery.limit && postQuery.page && startDate && endDate) {
      return this.postRepository.find({
        where: {
          createdAt: Between(startDate, endDate),
        },
        take: postQuery.limit,
        skip: (postQuery.page - 1) * postQuery.limit,
      });
    }

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

  public async findPostById(id: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOneBy({ id });

      if (!post) {
        console.error(`Post with ID ${id} not found`);
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (err) {
      throw new Error(`Error finding post with ID ${id}: ${err}`);
    }
  }

  public async deletePost(id: string): Promise<void> {
    const post = await this.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postRepository.delete(id);

    return;
  }
}
