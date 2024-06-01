import { Test, TestingModule } from '@nestjs/testing';
import { SabreController } from './sabre.controller';

describe('SabreController', () => {
  let controller: SabreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SabreController],
    }).compile();

    controller = module.get<SabreController>(SabreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
