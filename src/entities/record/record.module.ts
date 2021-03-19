import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Record, RecordSchema } from "./schemas/record.schema";
import { RecordService } from "./record.service";
import { RecordController } from "./record.controller";
import { Connection } from "mongoose";
import * as AutoIncrementFactory from "mongoose-sequence";
import * as mongoosePaginate from "mongoose-paginate";

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Record.name,
    useFactory: (conn: Connection) => {
      const schema = RecordSchema;
      // @ts-ignore
      const AutoIncrement = AutoIncrementFactory(conn);
      // @ts-ignore
      schema.plugin(AutoIncrement, {
        inc_field: "recordId",
        start_seq: 1
      }).plugin(mongoosePaginate);
      return schema;
    },
    inject: [getConnectionToken()]
  }])],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService]
})

export class RecordModule {
}
