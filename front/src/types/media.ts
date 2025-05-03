export interface Media {
  src: string;
  author: string;
  liked: boolean;
  views: number;
  glims: number;
  date: string;
  type: MediaType;
}

export type MediaType = 'photo' | 'video';
