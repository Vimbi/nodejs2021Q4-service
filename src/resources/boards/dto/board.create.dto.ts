import { IsDefined, IsString } from 'class-validator';

export class BoardCreateDto {
  @IsString()
  title: string;

  @IsDefined()
  columns: string;
}
