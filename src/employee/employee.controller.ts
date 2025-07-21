import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create_employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  async createEmployee(@Body() employee: CreateEmployeeDto) {
    return this.employeeService.create(employee);
  }

  @Get()
  isAlive(): { message: string } {
    return { message: 'Employee service is alive' };
  }
}
