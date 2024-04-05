import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;
}

export class GetCoursesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  authorId: string;
}
