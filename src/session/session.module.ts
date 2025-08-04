import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Employee } from '../employee/employee.entity';
import { Customer } from '../customer/customer.entity';
import { Procedure } from '../procedure/procedure.entity';
import { SessionService } from './sessioin.sevice';
import { SessionController } from './session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Employee, Customer, Procedure])],
  exports: [TypeOrmModule],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
