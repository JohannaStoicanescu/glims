import { Readable } from "stream";

export interface StorageService {
  uploadFile(key: string, file: Buffer, contentType?: string): Promise<string>;
  downloadFile(key: string): Promise<Buffer>;
  getFileStream(key: string): Promise<Readable>;
  deleteFile(key: string): Promise<void>;
  listFiles(prefix?: string, maxKeys?: number): Promise<string[]>;
  fileExists(key: string): Promise<boolean>;
  getPresignedUrl(key: string, expiresIn?: number): Promise<string>;
}
