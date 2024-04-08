import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class BillingController {
  private readonly logger = new Logger(BillingController.name);

  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('course_created')
  @UseGuards(JwtAuthGuard)
  async handleCourseCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
