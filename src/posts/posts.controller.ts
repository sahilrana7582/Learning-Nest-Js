import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { CreaetePostDto } from './dtos/create-post.dto';
import { GetPostDto } from './dtos/get-post-base.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAllPosts(@Query() postQuery: GetPostDto): Promise<PostEntity[]> {
    return this.postsService.findAllPosts(postQuery); // Ensure postQuery is passed here
  }

  @Post(':id')
  public createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: CreaetePostDto,
  ): Promise<PostEntity> {
    return this.postsService.createPost(post, id);
  }

  @Post('many')
  public async createManyPosts(@Body() posts: PostEntity[]): Promise<PostEntity[]> {
    return this.postsService.createManyPosts(posts);
  }

  @Delete(':id')
  public deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @Get(':id')
  public async findPostById(
    @Param('id') id: string,
    @Query() postQuery: GetPostDto,
  ): Promise<PostEntity | null> {
    const post = await this.postsService.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
