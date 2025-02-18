import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './providers/posts.service';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, MetaOptions, User]),
    MetaOptionsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
