import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Course extends AbstractDocument {
  @Prop({ type: Date, default: Date.now() })
  timestamp: Date;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  authorId: string;

  @Prop({ type: Array<string>, required: true })
  lessonsId: string[];

  @Prop({ type: Array<string>, default: [] })
  consumers: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
