import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create_employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) { }

  create(dto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(dto);
    return this.employeeRepository.save(employee);
  }
}
