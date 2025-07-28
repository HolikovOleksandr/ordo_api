import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Session } from '../session/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Customer])],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
