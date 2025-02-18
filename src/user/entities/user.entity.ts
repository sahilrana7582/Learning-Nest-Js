import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  firstName: string;

  @BeforeInsert()
  @BeforeUpdate()
  trimFirstName() {
    this.firstName = this.firstName.trim();
  }

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  lastName: string;

  @BeforeInsert()
  @BeforeUpdate()
  trimLastName() {
    this.lastName = this.lastName.trim();
  }

  @Column({
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  nickName: string;

  @Column()
  age: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    length: 20,
  })
  password: string;

  @OneToMany(() => Post, (posts) => posts.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
