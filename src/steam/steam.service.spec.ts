import { Test, TestingModule } from '@nestjs/testing';
import { SteamService } from './steam.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('SteamService', () => {
  let service: SteamService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule, // Importe o HttpModule
        ConfigModule.forRoot(), // Configure o módulo de variáveis de ambiente
      ],
      providers: [SteamService],
    }).compile();

    service = module.get<SteamService>(SteamService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });
});