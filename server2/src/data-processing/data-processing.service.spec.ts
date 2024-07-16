import { Test, TestingModule } from '@nestjs/testing';
import { DataProcessingService } from './data-processing.service';

describe('DataProcessingService', () => {
  let service: DataProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataProcessingService],
    }).compile();

    service = module.get<DataProcessingService>(DataProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
