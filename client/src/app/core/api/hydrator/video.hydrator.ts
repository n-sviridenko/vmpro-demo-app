import { Video } from 'app/model';

export class VideoHydrator {
  public static hydrate(object: Video, data): Video {
    object.id = data.id;
    object.title = data.title;
    object.thumbnail = data.thumbnail;

    return object;
  }
}
