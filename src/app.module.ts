import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeModule } from 'employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { SessionModule } from 'session/session.module';
import { CustomerModule } from 'customer/customer.module';
import { ProcedureModule } from 'procedure/procedure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.user'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true,
      }),
    }),
    EmployeeModule,
    SessionModule,
    CustomerModule,
    ProcedureModule,
  ],
})
export class AppModule {}
