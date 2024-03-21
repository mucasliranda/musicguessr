import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  gameId: string;

  @IsNotEmpty()
  @IsArray()
  albums: Array<string>;
}