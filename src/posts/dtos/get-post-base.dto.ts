import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'common/pagination/dtos/pagination-query.dto';

class GetPostBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostDto extends IntersectionType(
  GetPostBaseDto,
  PaginationQueryDto,
) {}
