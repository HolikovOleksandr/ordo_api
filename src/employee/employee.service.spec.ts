import { CreateEmployeeDto } from './dto/create_employee.dto';
import { Qualification } from './enum/qualification.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { Repository } from 'typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: Repository<Employee>;

  const mockRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockDto = new CreateEmployeeDto();
  mockDto.phoneNumber = '+380123456789';
  mockDto.firstName = 'John';
  mockDto.lastName = 'Doe';
  mockDto.qualification = Qualification.Middle;

  beforeEach(async () => {
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

  it('should be defined', () => expect(service).toBeDefined());

  it('should create a new Employee from DTO', async () => {
    const expectedEmployee: Employee = { id: 'some-uuid', ...mockDto };
    mockRepository.create.mockReturnValue(expectedEmployee);
    mockRepository.save.mockResolvedValue(expectedEmployee);

    await expect(service.create(mockDto)).resolves.toEqual(expectedEmployee);
  });

  it('should throw the error if employee with the same phone number exists', async () => {
    const existingEmployee: Employee = { id: '1', ...mockDto };
    mockRepository.findOne.mockResolvedValue(existingEmployee);
    mockRepository.findOne.mockResolvedValueOnce(existingEmployee);
    mockRepository.save.mockClear();

    await expect(service.create(mockDto)).rejects.toThrowError(
      'Employee with this phone number already exists',
    );

    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should find all employees', async () => {
    const employees: Employee[] = [
      { id: '1', ...mockDto },
      { id: '2', ...mockDto },
    ];

    mockRepository.find.mockResolvedValue(employees);
    await expect(service.findAll()).resolves.toEqual(employees);
  });

  it('should find an employee by ID', async () => {
    const employee: Employee = { id: '1', ...mockDto };
    mockRepository.findOne.mockResolvedValue(employee);
    await expect(service.findOneById('1')).resolves.toEqual(employee);
  });

  it('should return null if employee not found by ID', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.findOneById('1')).resolves.toBeNull();
  });

  it('should update an employee', async () => {
    const updateDto = { firstName: 'Jane' };
    const existingEmployee: Employee = { id: '1', ...mockDto };

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
