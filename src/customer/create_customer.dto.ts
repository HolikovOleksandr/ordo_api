import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Robert', description: 'First name of the customer' })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: '+380987654321', description: 'Phone number in international format' })
  @IsPhoneNumber('UA')
  phone: string;
}
