import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './providers/posts.service';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, MetaOptions]), MetaOptionsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
