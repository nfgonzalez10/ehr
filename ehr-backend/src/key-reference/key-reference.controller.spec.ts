import { Test, TestingModule } from '@nestjs/testing';
import { KeyReferenceController } from './key-reference.controller';
import { KeyReferenceService } from './key-reference.service';

describe('KeyReferenceController', () => {
  let controller: KeyReferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyReferenceController],
      providers: [KeyReferenceService],
    }).compile();

    controller = module.get<KeyReferenceController>(KeyReferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
