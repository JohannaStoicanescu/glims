import { Injectable } from "@nestjs/common";
import { MediaStorage } from "./media-storage.interface";

@Injectable()
export class LocalFSStorageService implements MediaStorage {
  async upload(file: Buffer): Promise<string> {
    return `/var/storage/${file.toString("hex").slice(0, 8)}`;
  }

  async delete(_fileId: string): Promise<void> {
    // Implement your delete logic here
  }
}
