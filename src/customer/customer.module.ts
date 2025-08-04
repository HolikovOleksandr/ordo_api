import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Session } from '../session/session.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Customer])],
  exports: [TypeOrmModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
