import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetaOptionsDto } from './dto/meta-options.dto';
import { MetaOptionsService } from './meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}
  @Get()
  public getAllMetaOption() {
    return 'Hello World';
  }

  @Post()
  public createMetaOptions(@Body() metaOptionsDto: MetaOptionsDto) {
    return this.metaOptionsService.createMetaOptions(metaOptionsDto);
  }
}
