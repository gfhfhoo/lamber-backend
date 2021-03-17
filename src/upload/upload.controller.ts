import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class uploadController {
  constructor() {
  }

  @Post("uploadAvatar")
  @UseInterceptors(FileInterceptor("file", {
    limits: { fieldSize: 5242880 }
  }))
  uploadAvatar(@UploadedFiles() files: Express.Multer.File) {
    try {

    } catch (err) {
      return "failed";
    }
  }
}