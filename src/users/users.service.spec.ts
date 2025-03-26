import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  // Mock dos dados do usuário
  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Mock do UserRepository
    const mockUserRepository = {
      findByEmail: jest.fn().mockResolvedValue(mockUser),
      createUser: jest.fn().mockResolvedValue(mockUser),
      findAll: jest.fn().mockResolvedValue([mockUser]),
      findById: jest.fn().mockResolvedValue(mockUser),
      deleteUser: jest.fn().mockResolvedValue(mockUser),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository, // Injeta o UserRepository mockado
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const result = await service.findByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'hashedpassword',
      };
      const result = await service.createUser(userData);

      expect(userRepository.createUser).toHaveBeenCalledWith({
        ...userData,
        role: 'USER', // Verifica se o role padrão é 'USER'
      });
      expect(result).toEqual(mockUser);
    });

    it('should create a new user with a custom role', async () => {
      const userData = {
        email: 'admin@example.com',
        password: 'hashedpassword',
        role: 'ADMIN',
      };
      const result = await service.createUser(userData);

      expect(userRepository.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const id = 1;
      const result = await service.findById(id);

      expect(userRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      const id = 1;
      const result = await service.deleteUser(id);

      expect(userRepository.deleteUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });
  });
});