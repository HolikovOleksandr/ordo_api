import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Qualification } from '../enum/qualification.enum';

@Entity('employee')
export class Employee implements IUser {
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
}
