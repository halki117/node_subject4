import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @MaxLength(140, {
    message: 'Title is too long!! Within the 140 word limit!!',
  })
  title: string;

  @IsNotEmpty()
  @MaxLength(140, {
    message: 'Content is too long!! Within the 140 word limit!!',
  })
  content: string;
}