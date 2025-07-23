import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { EmployeeController } from "./employee.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [TypeOrmModule],
})
export class EmployeeModule {}
