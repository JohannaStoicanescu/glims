import { Injectable } from "@nestjs/common";
import MediaStorage from "./media-storage.interface";

@Injectable()
export class R2StorageService implements MediaStorage {
  async upload(file: Buffer): Promise<string> {
    // Implement your R2 upload logic here
    return `https://r2.example.com/${file.toString("hex").slice(0, 8)}`;
  }

  async delete(_fileId: string): Promise<void> {
    // Implement your R2 delete logic here
  }
}
