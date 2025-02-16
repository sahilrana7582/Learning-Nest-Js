import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { MetaOptionsDto } from 'src/meta-options/dto/meta-options.dto';

export class CreaetePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  bannerImage: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsNumber()
  views: number;

  @IsNotEmpty()
  @IsNumber()
  likes: number;

  @IsNotEmpty()
  @IsNumber()
  shares: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['published', 'not-published'])
  status: 'published' | 'not-published';

  @IsNotEmpty()
  @IsString()
  @IsEnum(['subscriber', 'private', 'public'])
  visibility: 'subscriber' | 'private' | 'public';

  @IsNotEmpty()
  @IsBoolean()
  isFeatured: boolean;

  @ApiPropertyOptional({
    type: 'object',
    properties: {
      metaValue: {
        description: 'The value of the meta tag',
        example: '{"sidebarEnabled": true,}',
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaOptionsDto)
  metaOptions: MetaOptionsDto | null;
}
