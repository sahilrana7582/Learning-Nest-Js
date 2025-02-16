import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from './meta-options.entity';
import { MetaOptionsDto } from './dto/meta-options.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
  ) {}

  public async createMetaOptions(metaOptionsDto: MetaOptionsDto) {
    const metaOptions = this.metaOptionsRepository.create(metaOptionsDto);
    return this.metaOptionsRepository.save(metaOptions);
  }
}
