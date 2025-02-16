import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  public createPost(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.createPost(post);
  }

  @Post('many')
  public createManyPosts(@Body() posts: PostEntity[]): Promise<PostEntity[]> {
    return this.postsService.createManyPosts(posts);
  }
}
