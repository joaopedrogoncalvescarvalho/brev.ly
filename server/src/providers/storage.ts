import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { env } from "../env";

export interface StorageProvider {
  upload(data: string, contentType: string, extension: string): Promise<string>;
}

export class CloudflareR2Storage implements StorageProvider {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY!,
      },
    });
  }

  async upload(
    data: string,
    contentType: string,
    extension: string,
  ): Promise<string> {
    const fileName = `${uuidv4()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET!,
      Key: fileName,
      Body: data,
      ContentType: contentType,
    });

    await this.s3Client.send(command);

    return `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;
  }
}

export const storageProvider = new CloudflareR2Storage();
