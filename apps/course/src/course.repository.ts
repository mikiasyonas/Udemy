import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Course } from './schemas/course.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class CourseRepository extends AbstractRepository<Course> {
  protected readonly logger = new Logger(CourseRepository.name);

  constructor(
    @InjectModel(Course.name) courseModel: Model<Course>,
    @InjectConnection() connection: Connection,
  ) {
    super(courseModel, connection);
  }
}
