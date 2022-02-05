import { IsInt, IsOptional, IsString } from 'class-validator';

export class TaskUpdateDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  order? = 0;

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
