import { Module } from '@nestjs/common';
import { KeyReferenceService } from './key-reference.service';
import { KeyReferenceController } from './key-reference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyReference } from './entities/key-reference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyReference])],
  controllers: [KeyReferenceController],
  providers: [KeyReferenceService],
  exports: [KeyReferenceService],
})
export class KeyReferenceModule {}
