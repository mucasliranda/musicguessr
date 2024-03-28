import { IsArray, IsNotEmpty } from 'class-validator';
import { Song } from 'src/shared/model';



export class AddSongsDto {
  @IsNotEmpty()
  @IsArray()
  songs: Array<Song>;
}