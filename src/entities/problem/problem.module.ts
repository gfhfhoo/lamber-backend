import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Problem, ProblemSchema } from "./schemas/problem.schmea";
import { ProblemService } from "./problem.service";
import { ProblemController } from "./problem.controller";
import { Connection } from "mongoose";
import * as AutoIncrementFactory from "mongoose-sequence";
import * as mongoosePaginate from "mongoose-paginate";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Problem.name,
      useFactory: (conn: Connection) => {
        // @ts-ignore
        const AutoIncrement = AutoIncrementFactory(conn);
        const schema = ProblemSchema;
        // @ts-ignore
        schema.plugin(AutoIncrement, {
          inc_field: "problemId",
          start_seq: 1
        }).plugin(mongoosePaginate);
        return schema;
      },
      inject: [getConnectionToken()]
    }])],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService]
})

export class ProblemModule {
}