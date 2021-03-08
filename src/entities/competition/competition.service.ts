import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { Competition, CompetitionDocument } from "./schemas/competition.schema";

@Injectable()
export class CompetitionService {
  constructor(@InjectModel(Competition.name) private readonly compModel: PaginateModel<CompetitionDocument>) {
  }

  async insert(comp: Competition): Promise<Competition> {
    return new this.compModel(comp).save();
  }

  async update(comp: Competition): Promise<boolean> {
    const res = await this.compModel.updateOne({
      competitionId: comp.competitionId
    }, comp);
    return res.n > 0 && res.nModified > 0;
  }

  async delete(id: number) {
    return this.compModel.deleteOne({
      problemId: id
    });
  }

  async getSingleCompetition(id: string): Promise<Competition> {
    return this.compModel.findOne({
      problemId: id
    });
  }

  async getCompetitions(page: number): Promise<Object> {
    const opts = {
      page: page,
      limit: 20
    };
    return this.compModel.paginate(this.compModel.find(), opts).then(r => {
      return {
        docs: r.docs,
        nowPage: Number(r.page).valueOf(),
        pageTotal: r.pages,
        itemTotal: r.total
      };
    });
  }
}
