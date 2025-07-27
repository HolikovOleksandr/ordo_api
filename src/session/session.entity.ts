import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SessionStatus } from './session_status.enum';
import { Customer } from '../customer/customer.entity';
import { Procedure } from 'src/procedure/procrdure.entity';
import { Employee } from 'src/employee/entity/employee.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'enum', enum: SessionStatus })
  status: SessionStatus;

  @ManyToOne(() => Procedure, (procedure) => procedure.sessions)
  @JoinColumn({ name: 'procedureId' })
  procedure: Procedure;

  @ManyToOne(() => Employee, (employee) => employee.sessions)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.sessions)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
