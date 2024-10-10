export type Category = 'porn' | 'not_porn' | 'uncertain' | 'not_annotated';

export interface Image {
  id: string;
  userId: string;
  // number in range 0-1
  confidence: number;
  url: string;
  // if undefined, this is interpreted as 'not_annotated'
  category?: Category;
  // TODO: Is unix timestamp fine?
  uploadTime: number;
}