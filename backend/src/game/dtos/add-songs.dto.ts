import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Song } from 'src/shared/model';



export class AddSongsDto {
  @IsNotEmpty()
  @IsArray()
  songs: Array<Song>;

  @IsNotEmpty()
  @IsString()
  gameId: string;
}