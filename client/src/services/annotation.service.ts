import { Annotation } from "../types/Annotation";
import { Image } from "../types/Image";
import { mockedImagesService } from "./mocked-images.service";

export class ImageService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.BASE_URL ?? '';
  }

  async postAnnotation(annotation: Annotation): Promise<Image> {
    // TODO: Uncomment when connecting with real API
    // const res = await fetch(this.baseUrl, {
    //   method: 'POST',
    //   body: JSON.stringify(annotation)
    // });

    // if (res.ok) {
    //   throw new Error(`Received error ${res.status} ${res.statusText}`)
    // }

    // TODO: Decide whether to return the updated resource (if easy to implement)
    
    const res = mockedImagesService.annotate(annotation);

    return res;
  }
}