import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Session } from '../session/session.entity';

@Entity({ name: 'customers' })
export class Customer implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 13, unique: true })
  phone: string;

  @OneToMany(() => Session, (session) => session.customer)
  sessions: Session[];
}
