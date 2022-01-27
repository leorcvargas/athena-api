import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserLinkService } from '../../src/user-link/create-user-link.service';

describe('CreateUserLinkService', () => {
  let _service: CreateUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserLinkService],
    }).compile();

    _service = module.get<CreateUserLinkService>(CreateUserLinkService);
  });

  it.todo('should be defined');

  it.todo('should create a new link');

  it.todo('should create a new link with the BASIC kind attached');
});
