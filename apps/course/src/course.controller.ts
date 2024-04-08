import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course-dto';
import { JwtAuthGuard } from '@app/common';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCourse(@Body() request: CreateCourseDto, @Req() req: any) {
    console.log(req.user);
    return this.courseService.createCourse(request);
  }

  @Get()
  async getCourses() {
    return this.courseService.getCourses();
  }
}
