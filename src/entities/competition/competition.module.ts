import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Competition, CompetitionSchema } from "./schemas/competition.schema";
import { CompetitionService } from "./competition.service";
import { Connection } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import { CompetitionController } from "./competition.controller";
import mongoosePaginate from "mongoose-paginate";

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Competition.name,
    useFactory: (conn: Connection) => {
      // @ts-ignore
      const AutoIncrement = AutoIncrementFactory(conn);
      const schema = CompetitionSchema;
      // @ts-ignore
      schema.plugin(AutoIncrement, {
        inc_field: "competitionId",
        start_seq: 1
      }).plugin(mongoosePaginate);
      return schema;
    },
    inject: [getConnectionToken()]
  }])],
  controllers: [CompetitionController],
  providers: [CompetitionService]
})

export class CompetitionModule {
}