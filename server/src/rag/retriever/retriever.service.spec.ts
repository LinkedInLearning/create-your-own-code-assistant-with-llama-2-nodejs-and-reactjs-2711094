import { Test, TestingModule } from '@nestjs/testing';
import { RetrieverService } from './retriever.service';

describe('RetrieverService', () => {
  let service: RetrieverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrieverService],
    }).compile();

    service = module.get<RetrieverService>(RetrieverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
