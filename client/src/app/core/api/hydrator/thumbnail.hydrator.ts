import { Thumbnail } from 'app/model';

export class ThumbnailHydrator {
  public static hydrate(object: Thumbnail, data): Thumbnail {
    object.url = data.url;

    return object;
  }
}
