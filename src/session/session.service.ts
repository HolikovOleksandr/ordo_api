import { Injectable } from '@nestjs/common';
import { Session } from './session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: Repository<Session>) {}

  async createSession(dto: Session) {}
}
