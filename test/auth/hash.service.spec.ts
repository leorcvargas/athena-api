import { Test, TestingModule } from '@nestjs/testing';

import { HashService } from '../../src/auth/hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a hash from plain text', () => {
    const plainText = 'random plain text';

    expect(service.hash(plainText)).resolves.not.toBe(plainText);
  });

  it('should compare and be valid', async () => {
    const plainText = 'random plain text';
    const hash = await service.hash(plainText);

    const result = await service.compare(plainText, hash);
    expect(result).toBeTruthy();
  });

  it('should compare and be invalid', async () => {
    const plainText = 'random plain text';
    const invalidPlainText = 'incorrect_password';
    const hash = await service.hash(plainText);

    const result = await service.compare(invalidPlainText, hash);
    expect(result).toBeFalsy();
  });
});
