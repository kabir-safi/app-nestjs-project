import { Test, TestingModule } from '@nestjs/testing';
import { TravelportController } from './travelport.controller';

describe('TravelportController', () => {
  let controller: TravelportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelportController],
    }).compile();

    controller = module.get<TravelportController>(TravelportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
