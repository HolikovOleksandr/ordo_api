import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSessionDto } from './create_session.dto';
import { SessionService } from './sessioin.sevice';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Session } from './session.entity';
import { ApiResponseDto } from '../common/dto/api_response.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session' })
  @ApiBody({ type: CreateSessionDto })
  @ApiResponse({ status: 201, description: 'Session created successfully', type: Session })
  @ApiResponse({ status: 400, description: 'Invalid session data' })
  @ApiResponse({ status: 500, description: 'Failed to create session' })
  async createSession(@Body() dto: CreateSessionDto): Promise<ApiResponseDto<Session>> {
    const session = await this.sessionService.createSession(dto);
    if (!session) throw new HttpException('Failed to create session', 500);

    return new ApiResponseDto<Session>({
      success: true,
      data: session,
      message: 'Session created successfully',
    });
  }
}
