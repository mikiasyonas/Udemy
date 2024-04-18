import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { CourseRepository } from './course.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/course/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
