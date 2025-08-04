import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from './create_customer.dto';
import { ApiResponseDto } from '../common/dto/api_response.dto';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid customer data' })
  @ApiResponse({ status: 500, description: 'Failed to create customer' })
  async create(@Body() dto: CreateCustomerDto): Promise<ApiResponseDto<Customer>> {
    const customer = await this.customerService.createCustomer(dto);
    if (!customer) throw new HttpException('Failed to create customer', 500);

    return new ApiResponseDto<Customer>({
      success: true,
      data: customer,
      message: 'Customer created successfully',
    });
  }
}
