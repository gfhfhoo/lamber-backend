import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type CompetitionDocument = Competition & Document;

@Schema()
export class Competition {

  constructor(competitionId: string) {
    this.competitionId = competitionId;
  }

  @Prop()
  competitionId: string;
  @Prop()
  title: string;
  @Prop()
  problems: string[];


}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);