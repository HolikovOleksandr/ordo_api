import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './create_session.dto';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async createSession(sessionData: CreateSessionDto): Promise<Session> {
    this.logger.log('🆕 Creating a new session');
    const session = this.sessionRepository.create(sessionData);

    const savedSession = await this.sessionRepository.save(session);
    this.logger.log(`✅ Session created with ID: ${savedSession.id}`);
    return savedSession;
  }
}
