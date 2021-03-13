import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type RecordDocument = Record & Document;

function de(json, ins) {
  for (const prop in json) {
    if (!json.hasOwnProperty(prop)) continue;
    ins[prop] = json[prop];
  }
}

@Schema()
export class Record {

  constructor(x: number | object) {
    if (typeof x == "string") this.recordId = x;
    else de(x, this);
  }

  @Prop()
  recordId: number;
  @Prop()
  submitterId: number;
  @Prop()
  CodeBody: string;
  @Prop()
  status: string;
  @Prop()
  timeUsed: number;
  @Prop()
  memoryUsed: number;
  @Prop()
  recordHash: string;

}

export const RecordSchema = SchemaFactory.createForClass(Record);