import { Annotation } from '../types/Annotation';
import { Image } from '../types/Image';
import { FilterOptions } from './image.service';
import mockedImages from './mocked-images.json';

class MockedImagesService {
  private images: Image[];

  constructor() {
    this.images = mockedImages;
  }

  getImages(filters: FilterOptions) {
    // TODO: Apply filters?
    return this.images;
  }

  annotate(annotation: Annotation) {
    const imageIndex = this.images.findIndex(({id}) => id === annotation.id);
    const image = this.images[imageIndex];

    image.category = annotation.category;

    return image;
  }
}

export const mockedImagesService = new MockedImagesService();