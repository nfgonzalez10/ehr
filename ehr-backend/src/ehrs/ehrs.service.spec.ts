import { Test, TestingModule } from '@nestjs/testing';
import { EhrsService } from './ehrs.service';

describe('EhrsService', () => {
  let service: EhrsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EhrsService],
    }).compile();

    service = module.get<EhrsService>(EhrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
