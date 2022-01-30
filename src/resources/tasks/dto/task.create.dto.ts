import { IsInt, IsOptional, IsString } from 'class-validator';

export class TaskCreateDto {
  @IsString()
  title: string;

  @IsInt()
  order = 0;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  boardId?: string;

  @IsString()
  @IsOptional()
  columnId?: string;
}
