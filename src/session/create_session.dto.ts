import { IsUUID, IsEnum, IsDateString } from 'class-validator';
import { SessionStatus } from '../common/enum/session_status.enum';

export class CreateSessionDto {
  @IsDateString()
  startAt: string;

  @IsEnum(SessionStatus)
  status: SessionStatus;

  @IsUUID()
  procedureId: string;

  @IsUUID()
  employeeId: string;

  @IsUUID()
  customerId: string;
}
