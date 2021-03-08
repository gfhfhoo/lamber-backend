import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Problem, ProblemDocument } from "./schemas/problem.schmea";
import { PaginateModel } from "mongoose";

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem.name) private readonly problemModel: PaginateModel<ProblemDocument>) {
  }

  async insert(problem: Problem): Promise<Problem> {
    return new this.problemModel(problem).save();
  }

  async update(problem: Problem): Promise<boolean> {
    const res = await this.problemModel.updateOne({
      problemId: problem.problemId
    }, problem);
    return res.n > 0 && res.nModified > 0;
  }

  async delete(id: number) {
    return this.problemModel.deleteOne({
      problemId: id
    });
  }

  async getSingleProblem(id: number): Promise<Problem> {
    return this.problemModel.findOne({
      problemId: id
    });
  }

  async getProblems(page: number): Promise<Object> {
    const opts = {
      page: page,
      limit: 20
    };
    return this.problemModel.paginate(this.problemModel.find(), opts).then(r => {
      return {
        docs: r.docs,
        nowPage: Number(r.page).valueOf(),
        pageTotal: r.pages,
        itemTotal: r.total
      };
    });
  }
}
