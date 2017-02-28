import * as _ from 'lodash';

import { FormErrorList } from '../../form';

export class FormErrorListHydrator {
  public static hydrate(object: FormErrorList, data): FormErrorList {
    object.errors = data.errors || [];

    _.forEach(data.children, (child, fieldName) => {
      if (!_.isEmpty(child)) {
        object.addChild(fieldName, FormErrorListHydrator.hydrate(new FormErrorList(), child));
      }
    });

    return object;
  }
}
