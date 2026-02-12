import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';
import { config } from '../config/config'

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly uploadDir = join(process.cwd(), 'uploads', 'avatars');

  constructor() {
    this.ensureUploadDirExists();
  }

  private async ensureUploadDirExists() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      this.logger.log(`Upload directory ensured: ${this.uploadDir}`);
    } catch (err) {
      this.logger.error('Failed to create upload directory:', err);
    }
  }

  async saveAvatar(file: Express.Multer.File, userId: string): Promise<string> {
    try {
      if (!file || !file.path) {
        throw new Error('Invalid file path');
      }

      const filename = `avatar-${userId}-${Date.now()}.webp`;
      const filePath = join(this.uploadDir, filename);
      
      this.logger.log(`Processing avatar for user ${userId}: ${file.path}`);

      // Lire le fichier depuis le disque (car file.buffer est null avec diskStorage)
      const imageBuffer = await fs.readFile(file.path);

      // Traiter l'image avec Sharp
      await sharp(imageBuffer)
        .resize(200, 200, { fit: 'cover', position: 'center' })
        .webp({ quality: 90 })
        .toFile(filePath);

      // Supprimer l'ancien fichier original (non compressé)
      await fs.unlink(file.path).catch(err => this.logger.warn(`Failed to delete original file: ${err.message}`));

      // URL accessible publiquement
      const publicPath = `/uploads/avatars/${filename}`;
      return `${config.baseUrl}${publicPath}`;
    } catch (error) {
      this.logger.error(`Error saving avatar: ${error.message}`);
      throw new Error(`Failed to save avatar: ${error.message}`);
    }
  }
}