import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Employee } from '../employee/employee.entity';
import { Customer } from '../customer/customer.entity';
import { Procedure } from '../procedure/procedure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Employee, Customer, Procedure])],
  exports: [TypeOrmModule],
})
export class SessionModule {}
