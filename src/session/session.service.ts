import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: Repository<Session>) {}
}
