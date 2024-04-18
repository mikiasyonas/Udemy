import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCourseDto } from './dto/course-dto';
import { CourseRepository } from './course.repository';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);
  constructor(
    private readonly courseRepository: CourseRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async createCourse(request: CreateCourseDto) {
    try {
      const course = await this.courseRepository.create(request);
      this.logger.log('Course Created...', course);
      await lastValueFrom(
        this.billingClient.emit('course_created', {
          request,
        }),
      );
      return course;
    } catch (err) {
      throw err;
    }
  }

  async getCourses() {
    const courses = await this.courseRepository.find({});
    return {
      count: courses.length,
      data: courses,
    };
  }
}
