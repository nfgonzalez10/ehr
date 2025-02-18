import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapping } from './entities/mapping.entity';
import { MappingsController } from './mappings.controller';
import { MappingsService } from './mappings.service';
import { TenantModule } from 'src/tenant/tenant.module';
import { KeyReferenceModule } from 'src/key-reference/key-reference.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mapping]),
    TenantModule,
    KeyReferenceModule,
  ],
  controllers: [MappingsController],
  providers: [MappingsService],
  exports: [MappingsService],
})
export class MappingsModule {}
