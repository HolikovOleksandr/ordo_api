import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create_employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from './dto/update_employee.dto';

@Injectable()
export class EmployeeService {
  private readonly logger: Logger = new Logger(EmployeeService.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const existingPhoneNumber = await this.employeeRepository.findOne({
      where: { phone: dto.phone },
    });

    if (existingPhoneNumber) {
      this.logger.error('❌ Employee with this phone number already exists');
      throw new ConflictException('Employee with this phone number already exists');
    }

    const employee = this.employeeRepository.create(dto);
    this.logger.log(`🆕 Creating new employee: ${employee.name}`);
    const savedEmployee = await this.employeeRepository.save(employee);

    this.logger.log(`✅ Employee created with ID: ${savedEmployee.id}`);
    return savedEmployee;
  }

  async findAll(): Promise<Employee[]> {
    this.logger.log('🔍 Fetching all employees');
    const employees = await this.employeeRepository.find();
    this.logger.log(`📋 Found ${employees.length} employees`);
    return employees;
  }

  async findOneById(id: string): Promise<Employee | null> {
    this.logger.log(`🔎 Fetching employee with ID: ${id}`);

    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      this.logger.warn(`⚠️ Employee with ID ${id} not found`);
      return null;
    }

    this.logger.log(`👤 Found employee: ${employee.name}`);
    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<Employee | null> {
    this.logger.log(`✏️ Updating employee with ID: ${id}`);

    const employee = await this.findOneById(id);
    if (!employee) {
      this.logger.warn(`⚠️ Employee with ID ${id} not found for update`);
      return null;
    }

    Object.assign(employee, dto);
    const updatedEmployee = await this.employeeRepository.save(employee);
    this.logger.log(`✅ Employee with ID ${id} updated`);
    return updatedEmployee;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`🗑️ Removing employee with ID: ${id}`);
    const result = await this.employeeRepository.delete(id);

    if (result.affected! > 0) {
      this.logger.log(`✅ Employee with ID ${id} removed`);
      return true;
    } else {
      this.logger.warn(`⚠️ Employee with ID ${id} not found for removal`);
      return false;
    }
  }
}
