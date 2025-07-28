
import { SessionStatus } from '../common/enum/session_status.enum';
import { Customer } from '../customer/customer.entity';
import { Employee } from '../employee/employee.entity';
import { Procedure } from '../procedure/procedure.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'enum', enum: SessionStatus })
  status: SessionStatus = SessionStatus.Pending;

  @OneToOne(() => Procedure, (procedure) => procedure.sessions)
  @JoinColumn({ name: 'procedureId' })
  procedure: Procedure;

  @ManyToOne(() => Employee, (employee) => employee.sessions)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.sessions)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
