/* eslint-disable prettier/prettier */

import { IsOptional } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  @IsOptional()
  image?: string;
  role: Role;
}
