import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/course-dto';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
  async createCourse(request: CreateCourseDto) {
    return this.courseRepository.create(request);
  }

  async getCourses() {
    return this.courseRepository.find({});
  }
}
