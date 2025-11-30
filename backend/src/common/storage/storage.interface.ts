export interface UploadResult {
  url: string;
  path: string;
  filename: string;
}

export interface IStorageService {
  /**
   * Upload a file to storage
   * @param file Buffer or file path
   * @param filename Original filename
   * @param folder Optional folder path
   * @returns Upload result with URL and path
   */
  uploadFile(file: Buffer, filename: string, folder?: string): Promise<UploadResult>;

  /**
   * Delete a file from storage
   * @param path File path or URL
   */
  deleteFile(path: string): Promise<void>;

  /**
   * Get public URL for a file
   * @param path File path
   * @returns Public URL
   */
  getPublicUrl(path: string): string;

  /**
   * Check if file exists
   * @param path File path
   * @returns True if file exists
   */
  fileExists(path: string): Promise<boolean>;
}

