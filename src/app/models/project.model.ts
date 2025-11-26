// src/models/project.model.ts
export interface Project {
  _id?: string;
  title: string;
  category: string;
  year: number;
  description: string;
  imageUrl: string;
  link: string;
}
