import { Test, TestingModule } from '@nestjs/testing';
import { KeyReferenceService } from './key-reference.service';

describe('KeyReferenceService', () => {
  let service: KeyReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyReferenceService],
    }).compile();

    service = module.get<KeyReferenceService>(KeyReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
