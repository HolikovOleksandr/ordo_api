import { Repository } from 'typeorm';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './create_employee.dto';
import { Employee } from './employee.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: Repository<Employee>;
  let mockDto: CreateEmployeeDto;

  const mockRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    mockDto = new CreateEmployeeDto();
    mockDto.name = 'John';
    mockDto.phone = '+380123456789';

    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new Employee from DTO', async () => {
    const expectedEmployee = { id: 'some-uuid', ...mockDto, sessions: [] };
    mockRepository.create.mockReturnValue(expectedEmployee);
    mockRepository.save.mockResolvedValue(expectedEmployee);

    await expect(service.create(mockDto)).resolves.toEqual(expectedEmployee);
  });

  it('should throw the error if employee with the same phone number exists', async () => {
    const existingEmployee = { id: '1', ...mockDto, sessions: [] };
    mockRepository.findOne.mockResolvedValueOnce(existingEmployee);
    mockRepository.save.mockClear();

    await expect(service.create(mockDto)).rejects.toThrow(
      'Employee with this phone number already exists',
    );

    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should find all employees', async () => {
    const employees = [
      { id: '1', ...mockDto, sessions: [] },
      { id: '2', ...mockDto, sessions: [] },
    ];

    mockRepository.find.mockResolvedValue(employees);
    await expect(service.findAll()).resolves.toEqual(employees);
  });

  it('should find an employee by ID', async () => {
    const employee = { id: '1', ...mockDto, sessions: [] };
    mockRepository.findOne.mockResolvedValue(employee);
    await expect(service.findOneById('1')).resolves.toEqual(employee);
  });

  it('should return null if employee not found by ID', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.findOneById('1')).resolves.toBeNull();
  });

  it('should update an employee', async () => {
    const updateDto = { name: 'Jane' };
    const existingEmployee = { id: '1', ...mockDto, sessions: [] };

    mockRepository.findOne.mockResolvedValue(existingEmployee);
    mockRepository.save.mockResolvedValue({ ...existingEmployee, ...updateDto });

    await expect(service.update('1', updateDto)).resolves.toEqual({
      ...existingEmployee,
      ...updateDto,
    });
  });

  it('should return null if employee not found for update', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.update('1', {})).resolves.toBeNull();
  });

  it('should remove an employee', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.remove('1')).resolves.toBe(true);
    expect(mockRepository.delete).toHaveBeenCalledWith('1');
  });
});
