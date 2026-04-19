import Dexie from 'dexie';

export interface Project {
  id?: number;
  name: string;
  imageData: string | Blob;
  aspectRatio: number;
  paperSize: string;
  widthCm?: number;
  heightCm?: number;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  createdAt: Date;
}

export class AppDatabase extends Dexie {
  projects!: Dexie.Table<Project, number>;

  constructor() {
    super('ArtistScaleDB');
    this.version(1).stores({
      projects: '++id, name, paperSize, createdAt',
    });
  }
}

export const db = new AppDatabase();
