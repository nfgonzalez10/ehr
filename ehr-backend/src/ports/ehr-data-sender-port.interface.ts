export interface EhrDataSenderPort {
  sendEhrData(data: Record<string, string>): Promise<string>;
  sendEhrDataBatch?(data: Record<string, string>[]): Promise<any>;
  getPatientData?(patientId: string): Promise<any>;
}

export const EhrDataSenderPort = Symbol('EhrDataSenderPort');
