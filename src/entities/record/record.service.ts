import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { Record, RecordDocument } from "./schemas/record.schema";

@Injectable()
export class RecordService {
  constructor(@InjectModel(Record.name) private readonly recordModel: PaginateModel<RecordDocument>) {
  }

  async insert(record: Record): Promise<Record> {
    return new this.recordModel(record).save();
  }

  async update(record: Record): Promise<boolean> {
    const res = await this.recordModel.updateOne({
      recordId: record.recordId
    }, record);
    return res.n > 0 && res.nModified > 0;
  }

  async delete(id: number) {
    return this.recordModel.deleteOne({
      recordId: id
    });
  }

  async getSingleRecord(id: number): Promise<Record> {
    return this.recordModel.findOne({
      recordId: id
    });
  }

  async getRecords(page: number): Promise<Object> {
    const opts = {
      page: page,
      limit: 20
    };
    return this.recordModel.paginate(this.recordModel.find(), opts).then(r => {
      return {
        docs: r.docs,
        nowPage: Number(r.page).valueOf(),
        pageTotal: r.pages,
        itemTotal: r.total
      };
    });
  }
}
