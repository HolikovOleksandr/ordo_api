import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse as SwaggerResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create_employee.dto';
import { UpdateEmployeeDto } from './dto/update_employee.dto';
import { Employee } from './entity/employee.entity';
import { ApiResponse } from 'src/common/api_response.dto';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: CreateEmployeeDto })
  @SwaggerResponse({ status: 201, description: 'Employee created', type: ApiResponse<Employee> })
  @SwaggerResponse({ status: 400, description: 'Invalid data' })
  @SwaggerResponse({ status: 500, description: 'Failed to create employee' })
  async create(@Body() dto: CreateEmployeeDto): Promise<ApiResponse<Employee>> {
    const employee = await this.employeeService.create(dto);
    if (!employee) {
      throw new HttpException('Failed to create employee', 500);
    }

    return new ApiResponse<Employee>({
      success: true,
      data: employee,
      message: 'Employee created successfully',
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @SwaggerResponse({
    status: 200,
    description: 'List of employees',
    type: ApiResponse<Array<Employee>>,
  })
  async findAll(): Promise<ApiResponse<Employee[]>> {
    const employees = await this.employeeService.findAll();

    return new ApiResponse<Employee[]>({
      success: true,
      data: employees,
      message: `${employees.length} Employees found successfully`,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @SwaggerResponse({ status: 200, description: 'Employee found', type: ApiResponse<Employee> })
  @SwaggerResponse({ status: 404, description: 'Employee not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<Employee>> {
    const employee = await this.employeeService.findOneById(id);
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);

    return new ApiResponse<Employee>({
      success: true,
      data: employee,
      message: 'Employee retrieved successfully',
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateEmployeeDto })
  @SwaggerResponse({ status: 200, description: 'Employee updated', type: ApiResponse<Employee> })
  @SwaggerResponse({ status: 404, description: 'Employee not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmployeeDto,
  ): Promise<ApiResponse<Employee>> {
    const updated = await this.employeeService.update(id, dto);
    if (!updated) throw new NotFoundException(`Employee with id ${id} not found`);

    return new ApiResponse<Employee>({
      success: true,
      data: updated,
      message: 'Employee updated successfully',
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete employee by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @SwaggerResponse({ status: 204, description: 'Employee deleted' })
  @SwaggerResponse({ status: 404, description: 'Employee not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted = await this.employeeService.remove(id);
    if (!deleted) throw new NotFoundException(`Employee with id ${id} not found`);
  }
}
