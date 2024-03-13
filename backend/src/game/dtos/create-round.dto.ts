import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRoundDto {
  @IsNotEmpty()
  @IsString()
  gameId: string;

  @IsNotEmpty()
  @IsString()
  musicId: string;

  @IsNotEmpty()
  @IsString()
  music: string;

  @IsNotEmpty()
  @IsNumber()
  startAt: number

  @IsNotEmpty()
  @IsNumber()
  number: number;
}