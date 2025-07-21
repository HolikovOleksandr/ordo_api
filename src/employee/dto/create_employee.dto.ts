import { IsString, IsEnum, Length, IsPhoneNumber } from 'class-validator';
import { Qualification } from '../enum/qualification.enum';

export class CreateEmployeeDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsPhoneNumber('UA')
  phoneNumber: string;

  @IsEnum(Qualification)
  qualification: Qualification;
}
