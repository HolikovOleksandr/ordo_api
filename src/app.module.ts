import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { SessionModule } from './session/session.module';
import { CustomerModule } from './customer/customer.module';
import { ProcedureModule } from './procedure/procedure.module';
import { dbConfiguration } from './configuration/db.configuration';
import { appConfiguration } from './configuration/app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfiguration] }),
    TypeOrmModule.forRootAsync(dbConfiguration),
    EmployeeModule,
    SessionModule,
    CustomerModule,
    ProcedureModule,
  ],
})
export class AppModule { }
