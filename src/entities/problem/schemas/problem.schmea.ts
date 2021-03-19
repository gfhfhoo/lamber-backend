import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ProblemDocument = Problem & Document;

function de(json, ins) {
  for (const prop in json) {
    if (!json.hasOwnProperty(prop)) continue;
    ins[prop] = json[prop];
  }
}

@Schema()
export class Problem {

  constructor(x: number | object) {
    if (typeof x == "string") this.problemId = x;
    else de(x, this);
  }

  @Prop()
  problemId: number;
  @Prop()
  title: string;
  @Prop()
  passNumber: number = 0;
  @Prop()
  submitNumber: number = 0;
  @Prop()
  timeLimit: number; // ms
  @Prop()
  memoryLimit: number; // kb
  @Prop()
  detail: string = "";
  @Prop()
  sampleInput: string[] = [""];
  @Prop()
  sampleOutput: string[] = [""];
  @Prop()
  likes: number = 0;

}

export const ProblemSchema = SchemaFactory.createForClass(Problem);