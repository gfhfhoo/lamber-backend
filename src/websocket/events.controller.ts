import { Body, Controller, Post, Query } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";

@Controller()
export class eventsController {
  constructor(private readonly eventService: EventsGateway) {
  }

  @Post("publishEvent")
  async publishEvent(@Query("event") event: string = "message",
                     @Body() msg: string) {
    this.eventService.broadcastMessage(event, msg);
  }
}