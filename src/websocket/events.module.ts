import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { eventsController } from "./events.controller";

@Module({
  providers: [EventsGateway],
  controllers: [eventsController],
  exports: [EventsGateway]
})
export class EventsModule {
}