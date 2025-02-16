import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './meta-options.service';
import { MetaOptions } from './meta-options.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOptions])],
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  exports: [MetaOptionsService],
})
export class MetaOptionsModule {}
