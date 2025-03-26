import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  // Mock do UsersService
  const mockUsersService = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService, // Injeta o UsersService mockado
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should call usersService.findByEmail with the correct email', async () => {
      const email = 'test@example.com';
      await controller.findByEmail(email);

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('createUser', () => {
    it('should call usersService.createUser with the correct data', async () => {
      const userData = { email: 'test@example.com', password: 'password123', role: 'USER' };
      await controller.createUser(userData);

      expect(usersService.createUser).toHaveBeenCalledWith(userData);
    });
  });

  // Adicione mais testes para os outros métodos do controller
});