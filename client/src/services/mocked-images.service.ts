import { Annotation } from '../types/Annotation';
import { Image } from '../types/Image';
import { FilterOptions } from './image.service';
import mockedImages from './mocked-images.json';

class MockedImagesService {
  private images: Image[];

  constructor() {
    this.images = mockedImages as Image[];
  }

  getImages(filters: FilterOptions) {
    return {
      // TODO: Apply filters?
      data: this.images,
      offset: 0,
      totalResults: this.images.length
    }
  }

  annotate(annotation: Annotation) {
    const imageIndex = this.images.findIndex(({id}) => id === annotation.id);
    const image = this.images[imageIndex];

    image.category = annotation.category;

    return image;
  }
}

export const mockedImagesService = new MockedImagesService();