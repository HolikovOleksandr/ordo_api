import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Qualification } from '../enum/qualification.enum';
import { Session } from 'src/session/session.entity';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 13, unique: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: Qualification,
    default: Qualification.Junior,
  })
  qualification: Qualification;

  @OneToMany(() => Session, (session) => session.employee)
  sessions: Session[];
}
