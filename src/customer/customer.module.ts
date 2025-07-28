import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'session/session.entity';
import { Customer } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Customer])],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
