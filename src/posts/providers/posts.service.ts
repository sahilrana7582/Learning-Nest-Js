import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository, DataSource } from 'typeorm';
import { CreaetePostDto } from '../dtos/create-post.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,

    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
  ) {}

  public async createPost(post: CreaetePostDto): Promise<Post> {
    const metaValue = post.metaOptions
      ? this.metaOptionsRepository.create(post.metaOptions)
      : null;

    console.log(metaValue);
    if (metaValue) {
      await this.metaOptionsRepository.save(metaValue);
    }

    const postInfo = this.postRepository.create({
      ...post,
    });

    if (metaValue) {
      postInfo.metaValue = metaValue;
    }


    return this.postRepository.save(postInfo);
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
