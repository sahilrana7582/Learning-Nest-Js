import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @ManyToOne(() => User, (author) => author.posts)
  author: User;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  category: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  summary: string;

  @Column({ type: 'varchar', nullable: true })
  bannerImage: string;

  @Column({
    type: 'varchar',
    nullable: true,
    array: true,
  })
  tags: string[];

  @Column({
    type: 'int',
    default: 0,
  })
  views: number;

  @Column({
    type: 'int',
    default: 0,
  })
  likes: number;

  @Column({
    type: 'int',
    default: 0,
  })
  shares: number;

  @Column({
    type: 'enum',
    enum: ['published', 'not-published'],
    default: 'not-published',
  })
  status: 'published' | 'not-published';

  @Column({
    type: 'enum',
    enum: ['subscriber', 'private', 'public'],
    default: 'public',
  })
  visibility: 'subscriber' | 'private' | 'public';

  @Column({
    type: 'boolean',
    default: false,
  })
  isFeatured: boolean;

  @OneToOne(() => MetaOptions, (metaValue) => metaValue.post, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  metaValue?: MetaOptions;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
