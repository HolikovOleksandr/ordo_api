import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Qualification } from "../enum/qualification.enum";

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Qualification,
    default: Qualification.Junior,
  })
  qualification: Qualification;
}