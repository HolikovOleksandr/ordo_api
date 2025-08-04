import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(dto: Partial<Customer>): Promise<Customer> {
    const existingPhoneNumber = await this.customerRepository.findOne({
      where: { phone: dto.phone },
    });

    if (existingPhoneNumber) {
      this.logger.warn(`📞 Customer with this phone number already exists`);
      throw new ConflictException('Customer with this phone number already exists');
    }

    this.logger.log(`🆕 Creating new customer: ${dto.name}`);
    const customer = this.customerRepository.create(dto);
    const savedCustomer = await this.customerRepository.save(customer);
    
    this.logger.log(`✅ Customer created with ID: ${savedCustomer.id}`);
    return savedCustomer;
  }
}
