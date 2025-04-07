export interface MediaStorage {
  upload(file: Buffer): Promise<string>; // returns URL or id
  delete(fileId: string): Promise<void>;
}
