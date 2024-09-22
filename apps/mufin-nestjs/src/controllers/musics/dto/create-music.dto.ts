export class CreateMusicDto {
  title: string;
  is_available: boolean;
  cover_path: string;
  audio_path: string;
  created_at: Date;
  artist: number;
  genres: number[];
}
