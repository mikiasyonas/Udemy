import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course-dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() request: CreateCourseDto) {
    return this.courseService.createCourse(request);
  }

  @Get()
  async getCourses() {
    return this.courseService.getCourses();
  }
}
