import { IsNotEmpty, IsString } from 'class-validator';

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
}