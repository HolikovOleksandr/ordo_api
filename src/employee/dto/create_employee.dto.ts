import { IsString, IsEnum, Length, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Qualification } from '../enum/qualification.enum';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John', description: 'First name of the employee' })
  @IsString()
  @Length(1, 100)
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the employee' })
  @IsString()
  @Length(1, 100)
  lastName: string;

  @ApiProperty({ example: '+380987654321', description: 'Phone number in international format' })
  @IsPhoneNumber('UA')
  phoneNumber: string;

  @ApiProperty({ enum: Qualification, description: 'Qualification level of the employee' })
  @IsEnum(Qualification)
  qualification: Qualification;
}
