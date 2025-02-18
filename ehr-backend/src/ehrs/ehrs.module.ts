import { Module } from '@nestjs/common';
import { EhrsService } from './ehrs.service';
import { EhrsController } from './ehrs.controller';
import { MappingsModule } from 'src/mappings/mappings.module';
import { EhrHttpAdapter } from 'src/ehr-http-adapter/ehr-http-adapter';
import { EhrDataSenderPort } from 'src/ports/ehr-data-sender-port.interface';

@Module({
  imports: [MappingsModule],
  controllers: [EhrsController],
  providers: [
    EhrsService,
    {
      provide: EhrDataSenderPort,
      useClass: EhrHttpAdapter,
    },
  ],
})
export class EhrsModule {}
