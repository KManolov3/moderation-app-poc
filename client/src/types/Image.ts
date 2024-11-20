export type Category = 'porn' | 'not_porn' | 'uncertain' | 'not_annotated';

export interface Image {
  id: string;
  userName: string;
  // number in range 0-1
  confidence: number;
  imageUrl: string;
  userProfileUrl: string;
  // if undefined, this should be interpreted as 'not_annotated'
  category?: Category;
  // TODO: Decide whether to use unix timestamps vs a string format
  uploadTime: number;
}