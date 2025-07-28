import { IsString, IsEnum, Length, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Qualification } from 'common/enums/qualification.enum';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Joahn', description: 'First name of the employee' })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: '+380987654321', description: 'Phone number in international format' })
  @IsPhoneNumber('UA')
  phone: string;

  @ApiProperty({
    enum: Qualification,
    description: 'Qualification level of the employee',
    default: Qualification.Junior,
  })
  @IsEnum(Qualification)
  @IsOptional()
  qualification?: Qualification;
}
