import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { Record, RecordSchema } from "./schemas/record.schema";
import mongoosePaginate from "mongoose-paginate";

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Record.name,
    useFactory: (conn: Connection) => {
      const schema = RecordSchema;
      schema.plugin(mongoosePaginate);
      return schema;
    },
    inject: [getConnectionToken()]
  }])],
  controllers: [],
  providers: []
})

export class RecordModule {
}
