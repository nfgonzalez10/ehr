import { Injectable } from '@nestjs/common';
import { EhrDataSenderPort } from 'src/ports/ehr-data-sender-port.interface';

@Injectable()
export class EhrHttpAdapter implements EhrDataSenderPort {
  sendEhrData(data: Record<string, string>): Promise<any> {
    console.log('Sending EHR data:', data);
    // Implement the actual HTTP request logic here
    return Promise.resolve({ status: 'success' });
  }
}
