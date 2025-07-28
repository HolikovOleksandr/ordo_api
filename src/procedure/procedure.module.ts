import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './procedure.entity';
import { Session } from '../session/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure, Session])],
  exports: [TypeOrmModule],
})
export class ProcedureModule {}
