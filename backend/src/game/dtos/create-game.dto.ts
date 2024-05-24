import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  gameId: string;

  @IsNotEmpty()
  albums: {[key: string]: string[]};
}