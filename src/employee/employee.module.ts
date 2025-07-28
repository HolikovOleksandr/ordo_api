import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { Session } from '../session/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Session])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [TypeOrmModule],
})
export class EmployeeModule {}
