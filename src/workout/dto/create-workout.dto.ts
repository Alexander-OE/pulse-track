import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  repetitions: number;

  @IsNumber()
  @IsNotEmpty()
  sets: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsOptional()
  @IsDate()
  scheduledAt: Date;
}
