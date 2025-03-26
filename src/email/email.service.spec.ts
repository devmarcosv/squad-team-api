import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { EmailOptions } from './interfaces/IEmail.interface';

// Mock das opções de email
const mockEmailOptions: EmailOptions = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'user@ethereal.email',
    pass: 'password123',
  },
};

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: 'EMAIL_OPTIONS', // Injeta o mock das opções
          useValue: mockEmailOptions,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});