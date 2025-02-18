import { Test, TestingModule } from '@nestjs/testing';
import { EhrsController } from './ehrs.controller';
import { EhrsService } from './ehrs.service';

describe('EhrsController', () => {
  let controller: EhrsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EhrsController],
      providers: [EhrsService],
    }).compile();

    controller = module.get<EhrsController>(EhrsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
